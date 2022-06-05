printjson(
    db.people.mapReduce(
		function() {
			emit(this.sex, { weight: parseFloat(this.weight), height: parseFloat(this.height) }); 
		},
		function(keys, values) { 
			const avg = list => list.reduce((a, b) => a+b) / list.length;
			
			let weights = values.map(value => value.weight);
			let heights = values.map(value => value.height);
		
			return {
				"średnia waga": avg(weights),
				"średnia wysokość": avg(heights)
			}; 
		},
		{
			out: { inline: 1 }
		}
	)
);