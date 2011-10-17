steal('external/amplify.store.min.js').then(function () {
	var cache = function (entityName) {
		var $entityName = entityName;
		var $getAll = function () {
			var values = amplify.store($entityName);
			if (! values)
				return [];
			else
				return values;
		};
		var $latestId = 0;
		
		this.getLatestId = function () {
			return $latestId;
		};
		this.getAll = $getAll;
		this.get = function (id) {
			var values = $getAll();
			for(var index = 0; index < values.length; ++index) {
				if (values[index].id === id)
					return values[index];
			}
			return null;	
		};
		this.set = function (id, value) {
			value.id = id;
			var values = $getAll();
			var index = -1;
			$.each(values, function (i, value) {
				if (value.id === id)
					index = i;
			});
			
			if (index > -1) {
				values[index] = value;
			}
			else {
				values.push(value);
			}
			amplify.store($entityName, values);
			if ($latestId < id)
				$latestId = id;
		};
		this.del = function (id) {
			var values = $getAll();
			var splicedValues = $.grep(values, function (value) {
				return value.id !== id;
			});
			amplify.store($entityName, splicedValues);
		}
	};
	
	var privateNS = {
		data: {
			promociones: new cache('nahual.promociones')
		}
	};
	
	$.extend(true, $, {
		nahual: privateNS
	});
});