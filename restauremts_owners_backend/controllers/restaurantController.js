const Decision = require('../models/decisionModel');
const Restaurant = require('../models/restaurantModel');

// Fetch all pending restaurants from the decision table
exports.getPendingRestaurants = async (req, res) => {
  try {
    const pendingRestaurants = await Decision.find({});
    res.status(200).json(pendingRestaurants);
  } catch (error) {
    console.error('Error fetching pending restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch pending restaurants' });
  }
};

// Approve a restaurant (move to restaurant table)
exports.approveRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const decision = await Decision.findById(id);

    if (!decision) {
      return res.status(404).json({ error: 'Restaurant not found in decision table' });
    }

    // Move data to the restaurant table
    const restaurant = new Restaurant({
      restaurantName: decision.restaurantName,
      shopOwnerName: decision.shopOwnerName,
      shopAddress: decision.shopAddress,
      fssaiCode: decision.fssaiCode,
      aadharNumber: decision.aadharNumber,
      phoneNumber: decision.phoneNumber,
      bankAccountNumber: decision.bankAccountNumber,
      password: decision.password,
      mailId: decision.mailId
    });
    await restaurant.save();

    // Remove data from the decision table
    await Decision.findByIdAndDelete(id);

    res.status(200).json({ message: 'Restaurant approved and moved to the restaurant table' });
  } catch (error) {
    console.error('Error approving restaurant:', error);
    res.status(500).json({ error: 'Failed to approve restaurant' });
  }
};

// Reject a restaurant (delete from decision table)
exports.rejectRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    // Remove data from the decision table
    const decision = await Decision.findByIdAndDelete(id);

    if (!decision) {
      return res.status(404).json({ error: 'Restaurant not found in decision table' });
    }

    res.status(200).json({ message: 'Restaurant request rejected and removed' });
  } catch (error) {
    console.error('Error rejecting restaurant:', error);
    res.status(500).json({ error: 'Failed to reject restaurant' });
  }
};