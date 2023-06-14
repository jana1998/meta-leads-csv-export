const axios = require("axios");
const fs = require("fs");
const converter = require("json-2-csv");
let dataToSave = [];
let leadsArr = [];
let adSetName = "";
let totalLeads = 0;
const getDataSave = async (url, flag) => {
  try {
    const response = await axios.get(url);
    let leadToSave = {};
    let paginDetails = {};
    //dataToSave = dataToSave.concat(response.data.data);

    if (flag) {
      leadToSave = response.data.leads;
      paginDetails = leadToSave.paging;
      totalLeads = response.data.leads_count;
      console.log("Call Details", Object.values(response.data));
      leadsArr.push(...formalizeData(leadToSave.data));
      //   console.log("Response Data Keys", Object.keys(response.data));
      //   console.log("Lead Object Keys", Object.keys(leadToSave));
    } else {
      leadToSave = response.data.data;
      paginDetails = response.data.paging;
      //console.log("Response Data Keys", Object.keys(leadToSave));
      leadsArr.push(...formalizeData(leadToSave));
      //   console.log(response.data.paging);
      //   console.log("Lead Object Keys", Object.keys(paginDetails), paginDetails);
    }

    if (paginDetails && paginDetails.next) {
      console.log("Fetching next page:", paginDetails.next);
      await getDataSave(decodeURI(paginDetails.next), false);
    } else {
      console.log(
        "Check Status",
        leadsArr,
        leadsArr.length,
        totalLeads,
        "Should Be One Greater"
      );

      let csv = await converter.json2csv(leadsArr);
      saveToCSV(csv);
      return leadsArr;
    }
  } catch (error) {
    console.error("Error querying endpoint:", error);
  }
};
const formalizeData = (data) => {
  //console.log(data, field_data);
  let list = [];
  for (let i of data) {
    console.log("Formalizing", i);
    adSetName = i.adset_name;
    let field_data = i.field_data;
    let json = i;
    for (let j of field_data) {
      json[j.name] = j.values;
    }
    delete json.field_data;
    list.push(json);
  }
  return list;
};
const saveToCSV = (csv) => {
  fs.writeFile(`${adSetName}_Leads_${new Date().getTime()}.csv`, csv, (err) => {
    if (err) {
      console.error("Error writing to CSV file.", err);
    } else {
      console.log("Successfully written data to CSV file.");
    }
  });
};

//Replace Access Token Here
const access_token = "<ACCESS_TOKEN>";
//Replace Adset Id
const adSetId = "<ADSET ID>";

const url = `https://graph.facebook.com/v16.0/${adSetId}?fields=leads_count,name,leads{is_organic,adset_name,partner_name,custom_disclaimer_responses,field_data}&access_token=${access_token}`;
getDataSave(url, true);
