const puppeteer = require('puppeteer');

let scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.bhhsnmproperties.com/listing/listingsearchresultsonly.aspx?Search=05a2cedc-79c8-4046-8e28-53cfd2055067&SearchType=AgentHome&InternalAgentCd=&OfficeCds=&AgentHomePageSearchType=AllMyListings&ListingType=&ListingDistrictTypeID=&PriorSales=&Sort=6');
    await page.waitFor(2000);

    const result = await page.evaluate(() => {
	console.log("test");
	let prices = document.querySelectorAll('span[itemprop="price"]');
	let addresses = document.querySelectorAll('span[itemprop="streetAddress"]');
	let addresseslocality = document.querySelectorAll('span[itemprop="addressLocality"]');
	let addressesregion = document.querySelectorAll('span[itemprop="addressRegion"]');

	let photos = document.querySelectorAll("div > img");

	let first = true
	let photodata = []
	for(var element of photos){
	    if(!first){
		photodata.push(element.src);
	    }
	    if(first){
		first = false;
	    }
	}
	
	let pricedata = []
	for (var element of prices){
	    pricedata.push(element.innerText);
	}

	let addressdata = []
	for (var element of addresses){
	    addressdata.push(element.innerText);
	}

	let localitydata = []
	for (var element of addresseslocality){
	    localitydata.push(element.innerText);
	}

	let regiondata = []
	for (var element of addressesregion){
	    regiondata.push(element.innerText);
	}

	data = []
	for (i=0; i < pricedata.length; i++){
	    let price = pricedata[i]
	    let address = addressdata[i] + " " + localitydata[i] + " " + regiondata[i]
	    let photo = photodata[i]
	    data.push({"price": price, "address": address, "photo": photo})
	}
	
	return data;
    });
  // Scrape
  browser.close();
  return result;
};

scrape().then((value) => {
    console.log(value); // Success!
});
