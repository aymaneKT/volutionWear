import { getAdminActions, markActionAsRead } from "../models/adminActions.js";

export const getAdminActionsController = async (req, res) => {
  const { sellerId } = req.params;

  try {
    const actions = await getAdminActions(sellerId);
    return res.status(200).json({
      success: true,
      message: "Admin actions fetched successfully",
      data: actions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching admin actions",
      error: error.message,
    });
  }
};

export const markActionAsReadController = async (req, res) => {
  const { actionId } = req.params;

  try {
    const result = await markActionAsRead(actionId);
    if (result) {
      return res.status(200).json({
        success: true,
        message: "Action marked as read successfully",
      });
    }
    res.status(404).json({
      success: false,
      message: "Action not found or already marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error marking action as read",
      error: error.message,
    });
  }
};
