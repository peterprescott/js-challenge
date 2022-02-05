/* ************************************************************************
 * In this exercise, you're given a few functions simulating API          *
 * endpoints. Your task is to use them to write a function that retrieves *
 * a list of investable properties. Any property belonging to an          *
 * investable region or belonging to an investable region's descendant in *
 * the tree of regions is considered investable. Please write the most    *
 * performant but readable code you can (assuming the code would be       *
 * deployed to production), without modifying any of the API functions or *
 * the signature of `getInvestableProperties`. (You are allowed to add    *
 * your own helper functions though.) You can use the                     *
 * displayResults(data) helper as a sample callback. Your code should run *
 * on Node v14.17.                                                        *
 * ************************************************************************ */

/* ************************************************************************
 * AVAILABLE API FUNCTIONS -- DO NOT MODIFY THIS SECTION                  *
 * ************************************************************************ */

function waitFor(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

/* ************************************************************************
 * Returns a promise that returns an array of region objects that contain *
 * a parent region ("" when at the top level), creating a hierarchical    *
 * tree of data. Responses can take anywhere up to 1.5s to return. This   *
 * example uses a tree 4 levels deep, but your result will be tested      *
 * against a datafile that contains an unknown number of layers.          *
 * ************************************************************************ */

async function getAllRegions() {
  const regions = {
    regions: [
      { name: 'blackrod',               parent: 'bolton' },
      { name: 'bolton',                 parent: 'manchester' },
      { name: 'bury',                   parent: 'manchester' },
      { name: 'camden',                 parent: 'central london' },
      { name: 'camden town',            parent: 'camden' },
      { name: 'central london',         parent: 'london' },
      { name: 'covent garden',          parent: 'westminster' },
      { name: 'croydon',                parent: 'south-west london' },
      { name: 'east london',            parent: 'london' },
      { name: 'farnworth',              parent: 'bolton' },
      { name: 'hatton garden',          parent: 'camden' },
      { name: 'heywood',                parent: 'rochdale' },
      { name: 'holborn',                parent: 'camden' },
      { name: 'kensington and chelsea', parent: 'london' },
      { name: 'kew',                    parent: 'richmond upon thames' },
      { name: 'kingston upon thames',   parent: 'south-west london' },
      { name: 'london',                 parent: '' },
      { name: 'manchester',             parent: '' },
      { name: 'middleton',              parent: 'rochdale' },
      { name: 'north london',           parent: 'london' },
      { name: 'oldham',                 parent: 'manchester' },
      { name: 'richmond upon thames',   parent: 'south-west london' },
      { name: 'rochdale',               parent: 'manchester' },
      { name: 'south london',           parent: 'london' },
      { name: 'south-west london',      parent: 'london' },
      { name: 'twickenham',             parent: 'richmond upon thames' },
      { name: 'west london',            parent: 'london' },
      { name: 'westminster',            parent: 'central london' },
      { name: 'wimbledon',              parent: 'south-west london' },
    ],
  };

  await waitFor(Math.random() * 1500);

  return regions;
}

/* ************************************************************************
 * Takes as input a comma separated list of permissible regions. Will     *
 * return a promise that returns all properties that match any of the     *
 * regions provided (but will not make any assumptions about sub-regions: *
 * e.g. "london" will not return a match for "twickenham" even though     *
 * Twickenham is within the London region. Timing varies with the number  *
 * of provided regions. Assume that there are some regions that cause     *
 * unexpected errors which have not yet been investigated, and in such a  *
 * case the returned promise will be rejected with an error object.       *
 * ************************************************************************ */
async function getPropertiesByRegion(regions) {
  const properties = {
    properties: [
      { address: 'Whitton Rd, Twickenham TW2 7BA',                                        region: 'twickenham' },
      { address: 'Royal Botanic Gardens, Kew, Richmond, Surrey, TW9 3AE',                 region: 'kew' },
      { address: 'Plough Ln, London SW17 0BL',                                            region: 'wimbledon' },
      { address: 'Stables Market, Chalk Farm Road, London NW1',                           region: 'camden town' },
      { address: 'Westminster, London SW1A 0AA',                                          region: 'westminster' },
      { address: 'The Esplanade, Rochdale OL16 1AQ',                                      region: 'rochdale' },
      { address: 'The Old Town Hall, Parliament Square, Greaves Street, Oldham, OL1 1QN', region: 'oldham' },
      { address: 'Castle House, Castle Rd, Bury BL9 8QT',                                 region: 'bury' },
    ],
  };

  const properties_to_return = {
    properties: [],
  };

  const array_of_regions = regions.split(',');
  const number_of_regions_requested = (array_of_regions.length || 1);

  for (const desired_region of array_of_regions) {
    const matching_properties = properties.properties.filter(record => record.region === desired_region);
    properties_to_return.properties.push(...matching_properties);
  }

  await waitFor(Math.random() * 1000 * number_of_regions_requested);

  return properties_to_return;
}

/* ************************************************************************
 * Will return a promise that returns all subregions in which investable  *
 * properties are contained. You should not assume that these are all     *
 * leaf-elements within the hierarchy of the region tree.                 *
 * ************************************************************************ */
async function getInvestableRegions() {
  const investable_regions = {
    regions: [ 'camden', 'kew', 'rochdale' ],
  };

  await waitFor(Math.random() * 3000);

  return investable_regions;
}

function displayResults(data) {
  console.log(data);
}

/* ************************************************************************
 * END OF API IMPLEMENTATION                                              *
 * ************************************************************************ */


/* ************************************************************************
 * PLEASE IMPLEMENT YOUR RESPONSE BELOW:                                  *
 * ************************************************************************ */

 /* ************************************************************************
  * Please write the most performant but readable code you can (assuming   *
  * the code would be deployed to production), without modifying any of    *
  * the functions above and the signature of the following function, that  *
  * will return a promise that returns an object with the "properties" key *
  * whose value is an array of properties - { properties: [ {...}, ... ] } *
  * The properties should be contained in the specified region or any      *
  * sub-region (or sub-sub-region down to an unknown nth level) that is    *
  * within the "investable" regions (e.g. if "bury" is a descendant of     *
  * "manchester", calling your method with "manchester" should return      *
  * investable properties both in "bury" and in "manchester"). Your method *
  * should take as input a region (e.g. "london" or "wimbledon"). When     *
  * getPropertiesByRegion returns a promise to be rejected with an error,  *
  * log that error and continue the process. displayResults is a sample    *
  * callback to help with debugging. Your code should run on Node v14.17.  *
  * ************************************************************************ */

/* ********************************************
 * First, some helper functions:
 * ******************************************** */

/*
 * Returns a promise that contains an object
 * constructed from the regions array given
 * by the getAllRegions() API.
 */
async function getChildRegions(){
	let regions = await getAllRegions()
		.then(value=>value.regions)
		.catch(error => console.log(error));

	let childRegions = {};
	for (let i = 0; i < regions.length; i++) {
		region = regions[i].parent
		if (typeof childRegions[region] == 'undefined'){
			childRegions[region] = []
		}
		childRegions[region].push(regions[i].name);
	};
	return childRegions
}


/*
 * Get preliminary info once before main process.
 */
async function setup(){

	console.log('Getting preliminary info...')

	const investableRegions = await getInvestableRegions()
					.then(value=>value.regions,
						error=>console.log(error))

	const childRegions = await getChildRegions()
					.then(value=>value,
						error=>console.log(error))

	return {'investableRegions': investableRegions,
		'childRegions': childRegions}

}


/**
 * This is the main algorithm. It recursively adds all investable
 * property objects nested in the given region to the returned array.
 */
async function getNestedInvestableProperties(
			region, 
			info,
			propertiesArray=[],
			investable=false){

	console.log('Checking for investable properties in ' + region)

	let regionProperties = await getPropertiesByRegion(region)
					.then(value=>value.properties,
					      error=>console.log(error));
	 
	// An .indexOf() == -1 implies the value is not in the array.
	if (info.investableRegions.indexOf(region) != -1){investable = true};

	// A property is considered investable if any of its containing
	// regions are on the investable regions list.
	if (investable) {propertiesArray.push(...regionProperties)};

	let children = info.childRegions[region];

	if (children !== undefined){
		if (children.length > 0){
			for (let i=0; i<children.length; i++){
				await getNestedInvestableProperties(
					children[i],
					info,
					propertiesArray,
					investable
				);
			}
		}
	};

	return {'properties': propertiesArray}
}


/*
 * Use given signature to wrap async getNestedInvestableProperties
 */
function getInvestableProperties(top_level_region){

	return Promise.resolve(setup()).then(
		info => getNestedInvestableProperties(
				top_level_region,
				info
		)
	)
}	

/**********************************************/

/* Uncomment these working examples if you like... */
// getInvestableProperties('london').then(displayResults)
// getInvestableProperties('mancester').then(displayResults)
