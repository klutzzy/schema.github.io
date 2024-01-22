const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

app.use(session({
  secret: 'ironman',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 600000,
  }
}));

// Assume you have a server-side endpoint for login that returns a session ID upon successful authentication
async function submitPassword() {
  const password = document.getElementById("passwordInput").value;
  if (password === '') {  //Z5@hT_L
    req.session.isAuthenticated = true;
    req.session.isAdmin = false;
    res.json({ success: true });
  } else if (password === 'L%k_pR') {
    req.session.isAuthenticated = true;
    req.session.isAdmin = true;
    res.json({ success: true, admin: true });
  } else {
    res.json({ success: false });
  }
}


async function submitAPI() {
    dates = []
    ids = []
    apiData = document.getElementById("apiTextArea").value
    
    console.log(apiData)
    
    const commaIndex = apiData.indexOf(',');
    url = apiData.slice(0, commaIndex);
    url = url.slice(7, -1);
    emailSection = url.slice(url.indexOf('%40') - 7, url.indexOf('%40'));
    if (!checkString(emailSection)){
        alert("Invalid!");
        return;
    }
    
    headerrr = apiData.slice(commaIndex + 1);
    headerrr = headerrr.slice(0, -2);
    headerrr = JSON.parse(headerrr);
    bearer = headerrr.headers.authorization;
    
    
    response = await fetch(url, headerrr);
    data = await response.json();
    
    for (const item of data) {
        ws = item.ws + "," + item.id;
        ids.push(ws);
        const dateTime = item.dateTime;
        const timeZone = 'Europe/Bucharest'; // GMT+2
        const date = new Date(dateTime);
        date.setMinutes(date.getMinutes() - 60);
        const options = { weekday: 'long', timeZone, hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short' };
        formattedDate = date.toLocaleString('en-US', options);
        formattedDate = formattedDate.slice(0, -5);
        dates.push(formattedDate);
      }

    ws = ids;
    
    let itemList = document.getElementById("itemList");
        itemList.innerHTML = "";
        itemList = document.getElementById("itemList2");
        itemList.innerHTML = "";
        itemList = document.getElementById("itemList3");
        itemList.innerHTML = "";
        itemList = document.getElementById("itemList4");
        itemList.innerHTML = "";
        itemList = document.getElementById("itemList5");
        itemList.innerHTML = "";

    dates.forEach((item, count) => {


          const li = document.createElement("li");
          if(item.includes("Monday")) {
            itemList = document.getElementById("itemList");
            let newItem = item.slice(7,-1)
            li.textContent = `${newItem} [REMOVE]`;
          } else if(item.includes("Tuesday")) {
            itemList = document.getElementById("itemList2");
            let newItem = item.slice(9,-1)
            li.textContent = `${newItem} [REMOVE]`;
          } else if(item.includes("Wednesday")) {
            itemList = document.getElementById("itemList3");
            let newItem = item.slice(11,-1)
            li.textContent = `${newItem} [REMOVE]`;
          } else if(item.includes("Thursday")) {
            itemList = document.getElementById("itemList4");
            let newItem = item.slice(10,-1)
            li.textContent = `${newItem} [REMOVE]`;
          } else if(item.includes("Friday")) {
            itemList = document.getElementById("itemList5");
            let newItem = item.slice(8,-1)
            li.textContent = `${newItem} [REMOVE]`;
          }


          itemList.appendChild(li);

          function handleItemClick(itemCount) {
            li.addEventListener("click", async function () {
              console.log("Removing from itemList:", itemList);
              console.log("Removing item:", li);
              if (document.getElementById("itemList").contains(li)) {
                document.getElementById("itemList").removeChild(li);
              } else if (document.getElementById("itemList2").contains(li)) {
                document.getElementById("itemList2").removeChild(li);
              } else if (document.getElementById("itemList3").contains(li)) {
                document.getElementById("itemList3").removeChild(li);
              } else if (document.getElementById("itemList4").contains(li)) {
                document.getElementById("itemList4").removeChild(li);
              } else if (document.getElementById("itemList5").contains(li)) {
                document.getElementById("itemList5").removeChild(li);
              }
              console.log(itemCount)
              alert("You clicked item " + ws[itemCount]);

              erik = ws[itemCount].split(",");
              console.log("erik1: ", erik[0], " erik2: ", erik[1])
              const hello = {
                url: "https://app-kedbackend-prod-swe-02.azurewebsites.net/api/batch?clientIdentity=6b14119f-3bf2-4d23-8c49-c4be156f0e13&flags=modtrack",
                method: "POST",
                headers: {
                  accept: "application/json",
                  "accept-language": "en,sv;q=0.9,ko;q=0.8",
                  authorization: bearer,
                  "content-type": "application/json",
                  "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
                  "sec-ch-ua-mobile": "?0",
                  "sec-ch-ua-platform": "\"Chrome OS\"",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "cross-site",
                  Referer: "https://ks.kunskapsporten.se/",
                  "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                body: JSON.stringify([
                  { "op": "unlink", "sourceTable": "calendarEvents", "sourceId": erik[0], "targetId": erik[1], "label": "workshopBookings" },
                  { "op": "delete", "table": "workshopBookings", "id": erik[1] }
                ])
              }
              await fetch(hello.url, hello);

            });
          }
          handleItemClick(count);
        });
}


function checkString(string) {
  const pattern = /^[A-Za-z]{3}\d{4}$/;
  return pattern.test(string);
}