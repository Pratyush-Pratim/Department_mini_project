const LeaveModel = require("../Models/Leave");
const UserModel = require("../Models/User");
const DutyModel = require("../Models/Duty");

const createLeave = async (req, res) => {
    try {
        const {
            guardContact,
            firstName,
            lastName,
            leaveDays,
            reason,
            medicalFile,
            startDate,
        } = req.body;

        if (!guardContact || !firstName || !lastName || !leaveDays || !reason) {
            return res.status(400).json({
                message: "guardContact, firstName, lastName, leaveDays and reason are required"
            });
        }

        const guard = await UserModel.findOne({ contact: guardContact, role: "guard" });

        if (!guard) {
            return res.status(404).json({
                message: "Guard not found"
            });
        }

        // compute end date from startDate and leaveDays
        let start = startDate ? new Date(startDate) : new Date();
        start.setHours(0,0,0,0);
        const end = new Date(start);
        end.setDate(start.getDate() + Number(leaveDays) - 1);
        end.setHours(23,59,59,999);


        // first 7 days of the leave request are free; the rest are paid
        const totalDays = Number(leaveDays);
        const freeTotal = Math.min(7, totalDays);
        const paidTotal = Math.max(0, totalDays - freeTotal);

        const leave = await LeaveModel.create({
            guard: guard._id,
            firstName,
            lastName,
            leaveDays,
            reason,
            medicalFile,
            startDate: start,
            endDate: end,
            freeDays: freeTotal,
            paidDays: paidTotal,
        });

        res.status(201).json({
            message: "Leave request submitted",
            leave,
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getLeaves = async (req, res) => {
    try {
        const leaves = await LeaveModel.find()
            .populate("guard", "firstName lastName contact")
            .sort({ createdAt: -1 });

        const formatted = await Promise.all(leaves.map(async (leave) => {
            const duty = await DutyModel.findOne({ guard: leave.guard?._id })
                .sort({ dutyDate: -1, createdAt: -1 });

            // compute free/paid breakdown if not stored
            let free = leave.freeDays || 0;
            let paid = leave.paidDays || 0;

            if ((free === 0 && paid === 0) && leave.startDate && leave.endDate) {
                // compute per-month using approved leaves excluding this leave
                const MS_PER_DAY = 24 * 60 * 60 * 1000;
                const clamp = (d) => { const x = new Date(d); x.setHours(0,0,0,0); return x; };
                const monthStartOf = (date) => new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
                const monthEndOf = (date) => { const last = new Date(date.getFullYear(), date.getMonth() + 1, 0); last.setHours(23,59,59,999); return last; };

                const requestedStart = clamp(leave.startDate);
                const requestedEnd = new Date(leave.endDate);
                requestedEnd.setHours(23,59,59,999);

                let iterMonth = new Date(requestedStart.getFullYear(), requestedStart.getMonth(), 1);
                const endMonth = new Date(requestedEnd.getFullYear(), requestedEnd.getMonth(), 1);

                free = 0;
                paid = 0;

                while (iterMonth <= endMonth) {
                    const mStart = monthStartOf(iterMonth);
                    const mEnd = monthEndOf(iterMonth);

                    const overlapStart = requestedStart > mStart ? requestedStart : mStart;
                    const overlapEnd = requestedEnd < mEnd ? requestedEnd : mEnd;
                    let requestedDaysInMonth = 0;
                    if (overlapEnd >= overlapStart) {
                        requestedDaysInMonth = Math.floor((overlapEnd - overlapStart) / MS_PER_DAY) + 1;
                    }

                    if (requestedDaysInMonth > 0) {
                        const overlappingLeaves = await LeaveModel.find({
                            guard: leave.guard?._id,
                            status: "approved",
                            _id: { $ne: leave._id },
                            startDate: { $lte: mEnd },
                            endDate: { $gte: mStart },
                        });

                        let existingDays = 0;
                        for (const lf of overlappingLeaves) {
                            if (!lf.startDate || !lf.endDate) continue;
                            const s = clamp(lf.startDate);
                            const e = new Date(lf.endDate);
                            e.setHours(23,59,59,999);
                            const os = s > mStart ? s : mStart;
                            const oe = e < mEnd ? e : mEnd;
                            if (oe >= os) {
                                existingDays += Math.floor((oe - os) / MS_PER_DAY) + 1;
                            }
                        }

                        const availableFree = Math.max(0, 7 - existingDays);
                        const freeUsed = Math.min(requestedDaysInMonth, availableFree);
                        const paidUsed = requestedDaysInMonth - freeUsed;

                        free += freeUsed;
                        paid += paidUsed;
                    }

                    iterMonth.setMonth(iterMonth.getMonth() + 1);
                }
            }

            let leaveType = `${leave.leaveDays} day(s)`;
            if (free > 0 || paid > 0) {
                if (paid > 0) {
                    leaveType = `${free} day leave + ${paid} (paid leave)`;
                } else {
                    leaveType = `${free} day leave`;
                }
            }

            return {
                id: leave._id,
                guardId: leave.guard?._id,
                guardContact: leave.guard?.contact,
                employeeName: `${leave.firstName} ${leave.lastName}`.trim(),
                dutyPlace: duty?.locationName || "Not assigned",
                leaveDays: leave.leaveDays,
                leaveType,
                leaveReason: leave.reason,
                status: leave.status,
                startDate: leave.startDate,
                endDate: leave.endDate,
                freeDays: leave.freeDays || 0,
                paidDays: leave.paidDays || 0,
            };
        }));

        res.status(200).json({ leaves: formatted });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const updateLeaveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({
                message: "status must be approved or rejected"
            });
        }

        const leave = await LeaveModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!leave) {
            return res.status(404).json({
                message: "Leave request not found"
            });
        }

        res.status(200).json({
            message: `Leave ${status}`,
            leave,
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    createLeave,
    getLeaves,
    updateLeaveStatus,
};
