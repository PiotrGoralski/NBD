printjson(
    db.people.aggregate( 
        { 
            $group: {
                _id: "$sex",
                "średnia waga": { $avg: { $toDouble: "$weight" } },
                "średni wzrost": { $avg: { $toDouble: "$height" } }
            }
        })
    .toArray()
);