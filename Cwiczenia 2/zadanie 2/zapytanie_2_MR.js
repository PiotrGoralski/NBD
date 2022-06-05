printjson(
    db.people.mapReduce(
		function() {
			this.credit.forEach(credit => emit(credit.currency, parseFloat(credit.balance)));
		},
		function(keys, values) {
			return { Waluta: keys, "Łączna ilość pozostałych środków": values.reduce((a, b) => a + b) };
		},
		{
			out: { inline: 1 }
		}
	)
);