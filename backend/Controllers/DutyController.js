const DutyModel = require("../Models/Duty");
const UserModel = require("../Models/User");
const LeaveModel = require("../Models/Leave");

const assignDuty = async (req, res) => {
    try {
        const {
            guardId,
            locationType,
            locationName,
            guardsCount,
            shift,
            dutyDate,
            gender,
        } = req.body;
        // Require location info
        if (!locationType || !locationName) {
            return res.status(400).json({
                message: "locationType and locationName are required"
            });
        }

        // If guardId provided, keep old behavior (single guard assignment)
        if (guardId) {
            const guard = await UserModel.findOne({ _id: guardId, role: "guard" });

            if (!guard) {
                return res.status(404).json({
                    message: "Guard not found"
                });
            }

            // determine duty date to check (use provided dutyDate or today)
            const dutyDateToCheck = dutyDate ? new Date(dutyDate) : new Date();
            dutyDateToCheck.setHours(12,0,0,0); // midday to avoid timezone edge cases

            // prevent assigning if guard already has an active assigned duty (today or future)
            const todayStart = new Date();
            todayStart.setHours(0,0,0,0);
            const activeDuty = await DutyModel.findOne({ guard: guardId, status: "assigned", dutyDate: { $gte: todayStart } });
            if (activeDuty) {
                return res.status(400).json({ message: "Guard already has an active duty; cannot assign new duty until current duty is completed" });
            }

            // prevent assigning if guard is on approved leave that covers the duty date
            const onLeave = await LeaveModel.findOne({ guard: guardId, status: "approved", startDate: { $lte: dutyDateToCheck }, endDate: { $gte: dutyDateToCheck } });
            if (onLeave) {
                return res.status(400).json({ message: "Guard is on approved leave during the selected date; cannot assign duty" });
            }

            const duty = await DutyModel.create({
                guard: guardId,
                locationType,
                locationName,
                shift,
                dutyDate,
                guardsCount,
            });

            return res.status(201).json({
                message: "Duty assigned successfully",
                duty,
                assignedCount: 1,
            });
        }

        // If gender provided, assign random guards matching that gender
        if (gender) {
            const countRequested = Number(guardsCount) || 1;

            // find guards with matching gender
            const candidates = await UserModel.find({ role: "guard", gender: gender });

            // determine duty date to check (use provided dutyDate or today)
            const dutyDateToCheck = dutyDate ? new Date(dutyDate) : new Date();
            dutyDateToCheck.setHours(12,0,0,0);

            // exclude guards who already have active assigned duties (today or future)
            const todayStart = new Date();
            todayStart.setHours(0,0,0,0);
            const busyGuardIds = await DutyModel.distinct("guard", { status: "assigned", dutyDate: { $gte: todayStart } });

            // exclude guards who are on approved leave covering the duty date
            const onLeaveGuardIds = await LeaveModel.distinct("guard", { status: "approved", startDate: { $lte: dutyDateToCheck }, endDate: { $gte: dutyDateToCheck } });

            const unavailableIds = new Set([...busyGuardIds.map(id => id.toString()), ...onLeaveGuardIds.map(id => id.toString())]);

            const available = candidates.filter(c => !unavailableIds.has(c._id.toString()));

            if (!available || available.length === 0) {
                return res.status(404).json({
                    message: "No available guards found for the selected gender (all matching guards are busy or on leave)"
                });
            }
            // Shuffle available candidates and pick up to requested count
            const shuffled = available.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, Math.min(countRequested, available.length));

            // create duty entries for each selected guard
            const createdDuties = [];

            for (const g of selected) {
                const d = await DutyModel.create({
                    guard: g._id,
                    locationType,
                    locationName,
                    shift,
                    dutyDate,
                    guardsCount: selected.length,
                });
                createdDuties.push({ duty: d, guard: { id: g._id, firstName: g.firstName, lastName: g.lastName, contact: g.contact } });
            }

            return res.status(201).json({
                message: "Duty assigned successfully",
                assignedCount: createdDuties.length,
                assigned: createdDuties,
            });
        }

        // If neither guardId nor gender provided, bad request
        return res.status(400).json({
            message: "guardId or gender is required to assign duties"
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getAllDuties = async (req, res) => {
    try {
        const duties = await DutyModel.find()
            .populate("guard", "firstName lastName contact")
            .sort({ createdAt: -1 });

        res.status(200).json({ duties });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getGuardDuties = async (req, res) => {
    try {
        const { guardContact } = req.params;

        const guard = await UserModel.findOne({ contact: guardContact, role: "guard" });

        if (!guard) {
            return res.status(404).json({
                message: "Guard not found"
            });
        }

        const duties = await DutyModel.find({ guard: guard._id })
            .sort({ dutyDate: -1, createdAt: -1 });

        res.status(200).json({ duties });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    assignDuty,
    getAllDuties,
    getGuardDuties,
};
