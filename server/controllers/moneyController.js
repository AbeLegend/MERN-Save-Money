import Money from '../models/moneyModel';

export const createMoney = async (req, res) => {
  try {
    // Destructure
    const { money, status } = req.body;
    const { _id } = req.user;

    // Validation
    if (!_id) return res.status(400).send('Error. Please Login first to create');
    if (!money) return res.status(400).send('Money is required.');
    if (!status) return res.status(400).send('Status is required.');

    if (status === "minus") {
      const oldMoney = await Money.find({ userId: _id });
      if (!oldMoney) return res.status(400).send('Can not reduce money.');
      // Total
      let total = 0;
      for (const key in oldMoney) {
        const money = oldMoney[key].money;
        const status = oldMoney[key].status;
        if (status === "plus") {
          total += money;
        } else {
          total -= money;
        }
      }
      if (money > total) return res.status(400).send('Can not reduce money. Because not enough money.');
    }

    // Save
    let newMoney = new Money({ userId: _id, money, status });
    newMoney.save((err, result) => {
      if (err) {
        return res.status(400).send('Error. Please try again.');
      }
      return res.json(result);
    });

  } catch (err) {
    return res.status(500).send('Error. Try again.');
  }
}

export const readMoney = async (req, res) => {
  try {
    const { _id } = req.user;

    const money = await Money.find({ userId: _id }).sort({ createdAt: -1 });
    return res.status(200).json({ money });

  } catch (err) {
    return res.status(500).send('Error. Try again.');
  }
}

export const totalMoney = async (req, res) => {
  try {
    const { _id } = req.user;
    const myMoney = await Money.find({ userId: _id });
    let total = 0;
    for (const key in myMoney) {
      const money = myMoney[key].money;
      const status = myMoney[key].status;
      if (status === "plus") {
        total += money;
      } else {
        total -= money;
      }
    }
    return res.status(200).json(total);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}