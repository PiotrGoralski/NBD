printjson(
    db.people.mapReduce(
		function() {
			emit(this.job, this.job);
		},
		function(keys, vals) {
			return null;
		},
		{
			out: { inline: 1 },
		}
	)
);