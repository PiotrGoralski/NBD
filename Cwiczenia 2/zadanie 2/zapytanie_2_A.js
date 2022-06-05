printjson(
    db.people.aggregate([
        {
            $unwind: "$credit"
        },
        {
            $group: {
                _id: "$credit.currency",
                credits: { $sum: { $toDouble: "$credit.balance" } }
            }
        },
        {
            $project: {
                _id: 0,
                Waluta: "$_id",
                "Łączna ilość pozostałych środków": "$credits"
            }
        }
    ])
    .toArray()
);