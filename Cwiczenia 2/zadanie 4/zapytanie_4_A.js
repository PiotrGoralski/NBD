printjson(
    db.people.aggregate([
        {
            $group: {
                _id: "$nationality",
                "Średnie BMI": { 
                    "$avg": { 
                        $divide: [
                            { $toDouble: "$weight" }, 
                            { $pow: [{ $divide: [{ $toDouble: "$height" }, 100] }, 2] }
                        ] 
                    }
                }, "Minimalne BMI": { 
                    "$min": { 
                        $divide: [
                            { $toDouble: "$weight" }, 
                            { $pow: [{ $divide: [{ $toDouble: "$height" }, 100] }, 2] }
                        ] 
                    }
                }, "Maksymalne BMI": { 
                    "$max": { 
                        $divide: [
                            { $toDouble: "$weight" },
                            { $pow: [{ $divide: [{ $toDouble: "$height" }, 100] }, 2] }
                        ] 
                    }
                }
            }
        },
		{ 
			$sort: { _id: 1 } 
		}
    ])
    .toArray()
);