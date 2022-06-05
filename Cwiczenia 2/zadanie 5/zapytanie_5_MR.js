printjson(
    db.people.mapReduce(
		function() {
			this.credit.forEach(credit => emit(credit.currency, { balance: parseFloat(credit.balance), avg: 0, sum: 0 }));
		},
		function(keys, values) {
			let balances = values.map(value => value.balance);
			
			return {
				balance: 0,
                avg: balances.reduce((a, b) => a + b) / balances.length,
                sum: balances.reduce((a, b) => a + b)
            };
		},
		{
			out: { inline: 1 },
			query: { sex: "Female", nationality: "Poland" },
			finalize: function(keys, values) {
				return {
					Waluta: keys,
					"Średnia ilość środków na kartach": values.avg,
					"Łączna ilość środków na kartach": values.sum
				}
			}
		}
	)
);