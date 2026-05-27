const UserModel = require("../Models/User");
const DutyModel = require("../Models/Duty");
const LeaveModel = require("../Models/Leave");

const getGuards = async (req, res) => {
    try {
        const guards = await UserModel.find({ role: "guard" })
            .select("_id firstName lastName contact username")
            .sort({ createdAt: -1 });

        // compute which guards are currently on approved leave
        const today = new Date();
        today.setHours(12,0,0,0);

        const guardIds = guards.map(g => g._id);

        const onLeaveGuardIds = await LeaveModel.distinct("guard", {
            guard: { $in: guardIds },
            status: "approved",
            startDate: { $lte: today },
            endDate: { $gte: today },
        });

        const guardsWithLeave = guards.map(g => ({
            _id: g._id,
            firstName: g.firstName,
            lastName: g.lastName,
            contact: g.contact,
            username: g.username,
            onLeave: onLeaveGuardIds.map(id => id.toString()).includes(g._id.toString()),
        }));

        res.status(200).json({ guards: guardsWithLeave });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getGuardStats = async (req, res) => {
    try {
        const totalGuards = await UserModel.countDocuments({ role: "guard" });

        const activeDutyGuardIds = await DutyModel.distinct("guard", {
            status: "assigned",
        });

        res.status(200).json({
            totalGuards,
            activeDutyGuards: activeDutyGuardIds.length,
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getActiveGuards = async (req, res) => {
    try {
        // consider active duties as those with status 'assigned' and dutyDate >= today
        const today = new Date();
        today.setHours(0,0,0,0);

        const duties = await DutyModel.find({
            status: "assigned",
            dutyDate: { $gte: today },
        })
        .populate("guard", "firstName lastName contact username")
        .sort({ dutyDate: 1 });

        // Map duties to guards (one entry per duty). If a guard has multiple duties, include each occurrence.
        const result = duties.map(d => ({
            guard: d.guard,
            duty: {
                id: d._id,
                locationName: d.locationName,
                locationType: d.locationType,
                shift: d.shift,
                dutyDate: d.dutyDate,
                status: d.status,
            }
        }));

        res.status(200).json({ guards: result });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const deleteGuard = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Guard id is required" });
        }

        const guard = await UserModel.findOne({ _id: id, role: "guard" });

        if (!guard) {
            return res.status(404).json({ message: "Guard not found" });
        }

        // remove duties assigned to this guard
        await DutyModel.deleteMany({ guard: guard._id });

        // delete guard
        await UserModel.deleteOne({ _id: guard._id });

        res.status(200).json({ message: "Guard suspended and deleted successfully", id: guard._id });
    } catch (err) {
        console.error("deleteGuard error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getGuards,
    getGuardStats,
    getActiveGuards,
    deleteGuard,
};
