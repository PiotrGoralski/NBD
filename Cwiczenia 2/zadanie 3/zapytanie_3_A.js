printjson(
    db.people.aggregate([
        {
            $group: {
                _id: "$job",
            }
        },
		{
			$project: {
				_id: 0,
				job: "$_id"
			}
		},
		{ 
			$sort: { 
                job: 1 
            } 
		}
    ])
    .toArray()
);