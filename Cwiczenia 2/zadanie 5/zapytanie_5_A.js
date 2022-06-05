printjson(
    db.people.aggregate([
        {
            $match: { sex: "Female", nationality: "Poland" }
        },
        {
            $unwind: "$credit"
        },
        {
            $group: {
                _id: "$credit.currency",
                "Średnia ilość środków na kartach": { $avg: { $toDouble: "$credit.balance" } },
                "Łączna ilość środków na kartach": { $sum: { $toDouble: "$credit.balance" } },
            }
        },
        {
            $project: {
                _id: 0,
                Waluta: "$_id",
                "Średnia ilość środków na kartach": 1,
                "Łączna ilość środków na kartach": 1
            }
        },
		{
			$sort: { waluta: 1 } 
		}
    ])
    .toArray()
);