// import all inputs ('./user1_inputs')   as var

const moment = require("moment");
const FyersAPI = require("fyers-api-v3").fyersModel;
const _ = require("lodash");
const axios = require("axios");
const csv = require("csv-parser");
const { Readable } = require("stream");
const token = require("../fyers_token/token_saved.json");
const currentDate = new Date();
const year = currentDate.getUTCFullYear().toString().slice(-2);
const month = currentDate
  .toLocaleString("default", { month: "short" })
  .toUpperCase();
const day = currentDate.getUTCDate().toString().padStart(2, "0");
const formattedDate = `${year} ${month} ${day}`;
const access_token = token.accesstoken;
const appId = token.appId;
const url = token.url;

async function getLTP(galaxy_name_index) {
  return new Promise(async (resolve, reject) => {
    try {
      const FyersSocket = require("fyers-api-v3").fyersDataSocket;
      var fyersdata = FyersSocket.getInstance(access_token);

      var galaxy_name_index_LTP = "NSE:" + galaxy_name_index + "-INDEX";

      function onmsg(message) {
        if (message.symbol == galaxy_name_index_LTP) {
          resolve(message.ltp);
        }
      }

      function onconnect() {
        fyersdata.subscribe([galaxy_name_index_LTP]);
      }

      function onerror(err) {
        reject(err);
      }

      function onclose() {}

      fyersdata.on("message", onmsg);
      fyersdata.on("connect", onconnect);
      fyersdata.on("error", onerror);
      fyersdata.on("close", onclose);

      fyersdata.connect();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports.expiryDate = async (csvUrl, galaxy_name_expiry) => {
  const sdate = "NSE:" + galaxy_name_expiry;

  try {
    const response = await axios.get(csvUrl);

    return new Promise((resolve, reject) => {
      const readableStream = new Readable();
      readableStream._read = () => {};
      readableStream.push(response.data);
      readableStream.push(null);

      let endFlag = false;
      let expiryDate = "";

      readableStream
        .pipe(csv({ headers: false }))
        .on("data", (row) => {
          const symbolIndex = 1;
          const dateIndex = 9;
          const optionIndex = 16;

          if (
            row[symbolIndex].toUpperCase().startsWith(galaxy_name_expiry) &&
            row[optionIndex] === "CE" &&
            !endFlag
          ) {
            const inputString = row[symbolIndex];
            const dateRegex = /\b\d{1,2} [a-zA-Z]{3} \d{2}\b/;
            const extractedDate = inputString.match(dateRegex);

            if (formattedDate <= extractedDate) {
              if (row[dateIndex].toUpperCase().startsWith(sdate)) {
                const dateString = row[dateIndex];
                let refine1 = dateString.replace(sdate, "");
                let refine2 = refine1.replace("PE", "");

                let hasAlphabets = /[a-zA-Z]/.test(refine2);
                let alphabetCount = (refine2.match(/[a-zA-Z]/g) || []).length;

                if (alphabetCount == 3) {
                  expiryDate = refine2.substring(0, 5);
                } else {
                  expiryDate = refine2.substring(0, 5);
                }
              }
              endFlag = true;
              resolve(expiryDate);
            }
          }
        })
        .on("end", () => {
          resolve(expiryDate);
        });
    });
  } catch (error) {
    throw error;
  }
};

module.exports.indexAlgorithm = async (req, res) => {
  try {
              var {csvUrl,
            abharaham,
            adaeze,
            adaezeD,
            aeuvi,
            agarew,
            agarewD,
            aherth,
            aissat,
            alicia,
            aliyah,
            aliyahD,
            amarac,
            aminat,
            amous,
            amousD,
            amyara,
            antoine,
            arturo,
            asant,
            ashant,
            atbis,
            ayamea,
            ayameaD,
            ayohs,
            azania,
            azaniaD,
            berlin,
            berloy,
            captainamerica,
            carlicahn,
            caroldanvers,
            casca,
            chidin,
            christofernolan,
            copernicus,
            darwin,
            dayois,
            denver,
            dhab,
            dhaniyel,
            dhavithu,
            dhobithu,
            dhobithuD,
            dhobiyashu,
            dhobiyashuD,
            dhomaiyar,
            dhomaiyarD,
            douzi,
            douziD,
            eesak,
            esara,
            esaraD,
            eshe,
            esheD,
            esther,
            euler,
            falcon,
            farzi,
            ferik,
            feroz,
            ferozD,
            gabiriel,
            galaxy_name_expiry,
            galaxy_name_index,
            galaxy_name_options,
            galaxyie,
            gandía,
            gaztambide,
            georgesoros,
            gevez,
            ghukil,
            hannah,
            hannahD,
            hawkeye,
            helsinki,
            hostiu,
            hulk,
            imani,
            ironman,
            israyl,
            jamesrhodes,
            jarvis,
            jerslm,
            jerslmD,
            jimsimons,
            johnpaulson,
            jsoh,
            kahina,
            kaliy,
            karina,
            karita,
            kasew,
            kasewD,
            kaylin,
            kegzhe,
            khorshedji,
            kirana,
            kmoep,
            kyox,
            lanaya,
            larina,
            larisa,
            lasrt,
            lavas,
            lebaeu,
            lebaeuD,
            leboga,
            leiana,
            leila,
            lenora,
            leo,
            leonia,
            liyana,
            loki,
            lolita,
            lolitaD,
            louis,
            lukaw,
            lunara,
            mahasy,
            malaik,
            malqo,
            malqoD,
            malzsi,
            maoshi,
            marseille,
            matheuw,
            matheuwD,
            mayumi,
            meilin,
            meltonin,
            mialin,
            mialinD,
            mighawel,
            mighawelD,
            mikael,
            mikaelD,
            minami,
            moesan,
            money_heist,
            moscow,
            musk,
            nairobi,
            nalani,
            nalaniD,
            namgh,
            namghD,
            naqio,
            nasra,
            natasharomanoff,
            nawohg,
            nayara,
            nayarai,
            nayla,
            naylaD,
            nefert,
            negeymiya,
            negeymiyaD,
            niaowu,
            nikita,
            nikitaD,
            ninaia,
            ninara,
            nolara,
            nolita,
            nova,
            nubia,
            obadhiya,
            obadhiyaD,
            order1delay,
            order2delay,
            order3delay,
            order4delay,
            pajio,
            palermo,
            pasteur,
            paul,
            paulman,
            paultudorjones,
            PErso,
            peter,
            peterparker,
            peterquill,
            porix,
            professor,
            pythagoras,
            rackel,
            rafeal,
            ranaya,
            rayana,
            rayanaD,
            raydalio,
            reymon,
            riana,
            rikana,
            rikoma,
            rinaya,
            rio,
            rodrigo,
            sabina,
            salamoon,
            salamoonD,
            samuel,
            samuelD,
            sanya,
            sarian,
            sarina,
            scottlang,
            seemoan,
            seemoanD,
            selma,
            sergio,
            sofia,
            soraya,
            stevecohen,
            syuo,
            syuoD,
            tarana,
            tarani,
            thando,
            thor,
            tinara,
            tinaraD,
            tokyo,
            vase,
            wandamaximoff,
            warrenbuffett,
            warsaack,
            warx,
            wasp,
            wintersoldier,
            xhiog,
            xiaof,
            yakobu,
            yanara,
            yanina,
            yaraa,
            yarina,
            yelop,
            yoshuva,
            youna,
            younaD,
            yowan,
            yowanD,
            yudha,
            yukiko,
            yusaf,
            yusafD,
            yuwok,
            yuwokD,
            zainab,
            zainabD,
            zamiuo,
            zaraia,
            zarina,
            zenara,
            zolena,
            zurina,
            zuriya        
    } = req.body;
    const tag1 = 1;
    const tag2 = 2;
    const tag3 = 3;
    const tag4 = 4;
    
    const getCurrentTime = () => {
      const currentTime = new Date();
      return currentTime.toTimeString().split(" ")[0];
    };

    var time = getCurrentTime();

    var outputFormat = "HH:mm:ss";

    var jarvis = moment(jarvis, "hh:mm:ss A").format(outputFormat);

    var sofia = moment(sofia, "hh:mm:ss A").format(outputFormat);

    var alien = moment(alien, "hh:mm:ss A").format(outputFormat);

    var expiryDate = await this.expiryDate(csvUrl, galaxy_name_expiry);

    if (time > jarvis) {
      var engine = "ON";
      var lucy = "ON";
    }

    while (engine == "ON") {
      var ltp = await getLTP(galaxy_name_index);

      if (jarvis <= time && time <= sofia) {
        if (lucy == "ON") {
          var doctorstrange = Math.ceil(ltp / leo) * ghukil;
          var tonystark = Math.floor(ltp / xiaof) * hostiu;
          money_heist = 1;
          lucy = "OFF";
        }
        if (money_heist === 4) {
          money_heist = 4;
        } else if (warsaack > warx) {
          if (money_heist === 1) {
            if (doctorstrange <= ltp) {
              if (warsaack > warx) {
                var pe = "PE";
                var ce = "CE";
                var CEX = Math.floor(ltp / 100) * 100;
                var PEX = Math.ceil(ltp / 100) * 100;

                let ce_ltp_one = CEX;
                let ce_ltp_two = CEX + warrenbuffett;
                let ce_ltp_three = CEX + meilin;
                let ce_ltp_four = CEX + yukiko;

                let pe_ltp_one = PEX;
                let pe_ltp_two = PEX + warrenbuffett;
                let pe_ltp_three = PEX + meilin;
                let pe_ltp_four = PEX + yukiko;

                if (matheuw == 1) {
                  if (christofernolan === "CE") {
                    var symbol1 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_one +
                      ce;
                    if (captainamerica == "BUY") {
                      var side1 = 1;
                    } else {
                      var side1 = -1;
                    }
                  } else {
                    var symbol1 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_one +
                      pe;
                    if (captainamerica == "BUY") {
                      var side1 = 1;
                    } else {
                      var side1 = -1;
                    }
                  }
                  var qty1 = nairobi;
                }
                if (seemoan == 1) {
                  if (gabiriel == "CE") {
                    var symbol2 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_two +
                      ce;
                    if (ironman == "BUY") {
                      var side2 = 1;
                    } else {
                      var side2 = -1;
                    }
                  } else {
                    var symbol2 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_two +
                      pe;
                    if (ironman == "BUY") {
                      var side2 = 1;
                    } else {
                      var side2 = -1;
                    }
                  }
                  var qty2 = tokyo;
                }
                if (feroz == 1) {
                  if (mayumi == "CE") {
                    var symbol3 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_three +
                      ce;
                    if (rikoma == "BUY") {
                      var side3 = 1;
                    } else {
                      var side3 = -1;
                    }
                  } else {
                    var symbol3 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_three +
                      pe;
                    if (rikoma == "BUY") {
                      var side3 = 1;
                    } else {
                      var side3 = -1;
                    }
                  }
                  var qty3 = karina;
                }
                if (hannah == 1) {
                  if (ninaia == "CE") {
                    var symbol4 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_four +
                      ce;
                    if (liyana == "BUY") {
                      var side4 = 1;
                    } else {
                      var side4 = -1;
                    }
                  } else {
                    var symbol4 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_four +
                      pe;
                    if (liyana == "BUY") {
                      var side4 = 1;
                    } else {
                      var side4 = -1;
                    }
                  }
                  var qty4 = larisa;
                }
                function delay(ms) {
                  return new Promise((resolve) => setTimeout(resolve, ms));
                }
                if (symbol1) {
                  var order1 = this.orderPlace(symbol1, qty1, side1, tag1);
                }
                await delay(matheuwD);
                if (symbol2) {
                  var order2 = this.orderPlace(symbol2, qty2, side2, tag2);
                }
                await delay(seemoanD);
                if (symbol3) {
                  var order3 = this.orderPlace(symbol3, qty3, side3, tag3);
                }
                await delay(ferozD);
                if (symbol4) {
                  var order4 = this.orderPlace(symbol4, qty4, side4, tag4);
                }
                await delay(hannahD);
                var xioroberie = 1;
                var doctorstrange = doctorstrange;
                var spiderman = doctorstrange + professor;
                var tonystark = doctorstrange - berlin;
                var blackpanther = tonystark - musk;
                money_heist = 2;
              } else {
                money_heist = 4;
              }
            } else if (ltp <= tonystark) {
              if (warsaack > warx) {
                var pe = "PE";
                var ce = "CE";
                var CEX = Math.floor(ltp / 100) * 100;
                var PEX = Math.ceil(ltp / 100) * 100;

                let ce_ltp_one = CEX;
                let ce_ltp_two = CEX + georgesoros;
                let ce_ltp_three = CEX + lunara;
                let ce_ltp_four = CEX + zarina;

                let pe_ltp_one = PEX;
                let pe_ltp_two = PEX + georgesoros;
                let pe_ltp_three = PEX + lunara;
                let pe_ltp_four = PEX + zarina;

                if (yowan == 1) {
                  order1 = 1;
                  if (nova === "CE") {
                    var symbol1 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_one +
                      ce;
                    if (hulk == "BUY") {
                      var side1 = 1;
                    } else {
                      var side1 = -1;
                    }
                  } else {
                    var symbol1 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_one +
                      pe;
                    if (hulk == "BUY") {
                      var side1 = 1;
                    } else {
                      var side1 = -1;
                    }
                  }
                  var qty1 = rio;
                }
                if (mighawel == 1) {
                  if (rafeal == "CE") {
                    var symbol2 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_two +
                      ce;
                    if (thor == "BUY") {
                      var side2 = 1;
                    } else {
                      var side2 = -1;
                    }
                  } else {
                    var symbol2 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_two +
                      pe;
                    if (thor == "BUY") {
                      var side2 = 1;
                    } else {
                      var side2 = -1;
                    }
                  }
                  var qty2 = rackel;
                }
                if (mikael == 1) {
                  if (maoshi == "CE") {
                    var symbol3 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_three +
                      ce;
                    if (tarana == "BUY") {
                      var side3 = 1;
                    } else {
                      var side3 = -1;
                    }
                  } else {
                    var symbol3 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_three +
                      pe;
                    if (tarana == "BUY") {
                      var side3 = 1;
                    } else {
                      var side3 = -1;
                    }
                  }
                  var qty3 = yanara;
                }
                if (ayamea == 1) {
                  if (rikana == "CE") {
                    var symbol4 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_four +
                      ce;
                    if (zurina == "BUY") {
                      var side4 = 1;
                    } else {
                      var side4 = -1;
                    }
                  } else {
                    var symbol4 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_four +
                      pe;
                    if (zurina == "BUY") {
                      var side4 = 1;
                    } else {
                      var side4 = -1;
                    }
                  }
                  var qty4 = leiana;
                }
                function delay(ms) {
                  return new Promise((resolve) => setTimeout(resolve, ms));
                }
                if (symbol1) {
                  var order1 = this.orderPlace(symbol1, qty1, side1, tag1);
                }
                await delay(yowanD);
                if (symbol2) {
                  var order2 = this.orderPlace(symbol2, qty2, side2, tag2);
                }
                await delay(mighawelD);
                if (symbol3) {
                  var order3 = this.orderPlace(symbol3, qty3, side3, tag3);
                }
                await delay(mikaelD);
                if (symbol4) {
                  var order4 = this.orderPlace(symbol4, qty4, side4, tag4);
                }
                await delay(ayameaD);
                var xioroberie = 1;
                var tonystark = tonystark;
                var blackpanther = tonystark - paulman;
                var doctorstrange = tonystark + louis;
                var spiderman = doctorstrange + pasteur;
                money_heist = 3;
              } else {
                money_heist = 4;
              }
            } else {
              money_heist = 1;
            }
          } else if (money_heist === 2) {
            if (spiderman <= ltp) {
              function delay(ms) {
                return new Promise((resolve) => setTimeout(resolve, ms));
              }
              if (symbol4) {
                if (order4) {
                  if (side4 == 1) {
                    side4 = -1;
                  } else if (side4 == -1) {
                    side4 = 1;
                  }

                  var order4 = this.orderPlace(symbol4, qty4, side4, tag4);
                  order4 = 0;
                  symbol4 = 0;
                }
              }
              await delay(order4delay);
              if (symbol3) {
                if (order3) {
                  if (side3 == 1) {
                    side3 = -1;
                  } else if (side3 == -1) {
                    side3 = 1;
                  }
                  var order3 = this.orderPlace(symbol3, qty3, side3, tag3);
                  order3 = 0;
                  symbol3 = 0;
                }
              }
              await delay(order3delay);
              if (symbol2) {
                if (order2) {
                  if (side2 == 1) {
                    side2 = -1;
                  } else if (side2 == -1) {
                    side2 = 1;
                  }
                  var order2 = this.orderPlace(symbol2, qty2, side2, tag2);
                  order2 = 0;
                  symbol2 = 0;
                }
              }
              await delay(order2delay);
              if (symbol1) {
                if (order1) {
                  if (side1 == 1) {
                    side1 = -1;
                  } else if (side1 == -1) {
                    side1 = 1;
                  }

                  var order1 = this.orderPlace(symbol1, qty1, side1, tag1);
                  order1 = 0;
                  symbol1 = 0;
                }
              }
              await delay(order1delay);
              warx += 1;
              xioroberie = 1;

              if (warsaack > warx) {
                var pe = "PE";
                var ce = "CE";
                var CEX = Math.floor(ltp / 100) * 100;
                var PEX = Math.ceil(ltp / 100) * 100;

                let ce_ltp_one = CEX;
                let ce_ltp_two = CEX + paultudorjones;
                let ce_ltp_three = CEX + ranaya;
                let ce_ltp_four = CEX + yanina;

                let pe_ltp_one = PEX;
                let pe_ltp_two = PEX + paultudorjones;
                let pe_ltp_three = PEX + ranaya;
                let pe_ltp_four = PEX + yanina;

                if (lebaeu == 1) {
                  if (moesan === "CE") {
                    var symbol1 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_one +
                      ce;
                    if (hawkeye == "BUY") {
                      var side1 = 1;
                    } else {
                      var side1 = -1;
                    }
                  } else {
                    var symbol1 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_one +
                      pe;
                    if (hawkeye == "BUY") {
                      var side1 = 1;
                    } else {
                      var side1 = -1;
                    }
                  }
                  var qty1 = helsinki;
                }
                if (amous == 1) {
                  if (yudha == "CE") {
                    var symbol2 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_two +
                      ce;
                    if (natasharomanoff == "BUY") {
                      var side2 = 1;
                    } else {
                      var side2 = -1;
                    }
                  } else {
                    var symbol2 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_two +
                      pe;
                    if (natasharomanoff == "BUY") {
                      var side2 = 1;
                    } else {
                      var side2 = -1;
                    }
                  }
                  var qty2 = denver;
                }
                if (nalani == 1) {
                  if (kirana == "CE") {
                    var symbol3 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_three +
                      ce;
                    if (soraya == "BUY") {
                      var side3 = 1;
                    } else {
                      var side3 = -1;
                    }
                  } else {
                    var symbol3 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_three +
                      pe;
                    if (soraya == "BUY") {
                      var side3 = 1;
                    } else {
                      var side3 = -1;
                    }
                  }
                  var qty3 = nolara;
                }
                if (lolita == 1) {
                  if (zaraia == "CE") {
                    var symbol4 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_four +
                      ce;
                    if (ninara == "BUY") {
                      var side4 = 1;
                    } else {
                      var side4 = -1;
                    }
                  } else {
                    var symbol4 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_four +
                      pe;
                    if (ninara == "BUY") {
                      var side4 = 1;
                    } else {
                      var side4 = -1;
                    }
                  }
                  var qty4 = kaylin;
                }
                function delay(ms) {
                  return new Promise((resolve) => setTimeout(resolve, ms));
                }
                if (symbol1) {
                  var order1 = this.orderPlace(symbol1, qty1, side1, tag1);
                }
                await delay(lebaeuD);
                if (symbol2) {
                  var order2 = this.orderPlace(symbol2, qty2, side2, tag2);
                }
                await delay(amousD);
                if (symbol3) {
                  var order3 = this.orderPlace(symbol3, qty3, side3, tag3);
                }
                await delay(nalaniD);
                if (symbol4) {
                  var order4 = this.orderPlace(symbol4, qty4, side4, tag4);
                }
                await delay(lolitaD);
                var doctorstrange = spiderman;
                var spiderman = doctorstrange + copernicus;
                var tonystark = doctorstrange - darwin;
                var blackpanther = tonystark - khorshedji;
                money_heist = 2;
              } else {
                money_heist = 4;
              }
            } else if (ltp <= tonystark) {
              function delay(ms) {
                return new Promise((resolve) => setTimeout(resolve, ms));
              }
              if (symbol4) {
                if (order4) {
                  if (side4 == 1) {
                    side4 = -1;
                  } else if (side4 == -1) {
                    side4 = 1;
                  }

                  var order4 = this.orderPlace(symbol4, qty4, side4, tag4);
                  order4 = 0;
                  symbol4 = 0;
                }
              }
              await delay(order4delay);
              if (symbol3) {
                if (order3) {
                  if (side3 == 1) {
                    side3 = -1;
                  } else if (side3 == -1) {
                    side3 = 1;
                  }

                  var order3 = this.orderPlace(symbol3, qty3, side3, tag3);
                  order3 = 0;
                  symbol3 = 0;
                }
              }
              await delay(order3delay);
              if (symbol2) {
                if (order2) {
                  if (side2 == 1) {
                    side2 = -1;
                  } else if (side2 == -1) {
                    side2 = 1;
                  }

                  var order2 = this.orderPlace(symbol2, qty2, side2, tag2);
                  order2 = 0;
                  symbol2 = 0;
                }
              }
              await delay(order2delay);
              if (symbol1) {
                if (order1) {
                  if (side1 == 1) {
                    side1 = -1;
                  } else if (side1 == -1) {
                    side1 = 1;
                  }

                  var order1 = this.orderPlace(symbol1, qty1, side1, tag1);
                  order1 = 0;
                  symbol1 = 0;
                }
              }
              await delay(order1delay);

              if (xioroberie === 1) {
                var pe = "PE";
                var ce = "CE";
                var CEX = Math.floor(ltp / 100) * 100;
                var PEX = Math.ceil(ltp / 100) * 100;

                let ce_ltp_one = CEX;
                let ce_ltp_two = CEX + raydalio;
                let ce_ltp_three = CEX + sarina;
                let ce_ltp_four = CEX + lenora;

                let pe_ltp_one = PEX;
                let pe_ltp_two = PEX + raydalio;
                let pe_ltp_three = PEX + sarina;
                let pe_ltp_four = PEX + lenora;

                if (samuel == 1) {
                  if (yoshuva === "CE") {
                    var symbol1 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_one +
                      ce;
                    if (caroldanvers == "BUY") {
                      var side1 = 1;
                    } else {
                      var side1 = -1;
                    }
                  } else {
                    var symbol1 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_one +
                      pe;
                    if (caroldanvers == "BUY") {
                      var side1 = 1;
                    } else {
                      var side1 = -1;
                    }
                  }
                  var qty1 = arturo;
                }
                if (youna == 1) {
                  if (lukaw == "CE") {
                    var symbol2 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_two +
                      ce;
                    if (peterparker == "BUY") {
                      var side2 = 1;
                    } else {
                      var side2 = -1;
                    }
                  } else {
                    var symbol2 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_two +
                      pe;
                    if (peterparker == "BUY") {
                      var side2 = 1;
                    } else {
                      var side2 = -1;
                    }
                  }
                  var qty2 = moscow;
                }
                if (tinara == 1) {
                  if (zolena == "CE") {
                    var symbol3 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_three +
                      ce;
                    if (amyara == "BUY") {
                      var side3 = 1;
                    } else {
                      var side3 = -1;
                    }
                  } else {
                    var symbol3 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_three +
                      pe;
                    if (amyara == "BUY") {
                      var side3 = 1;
                    } else {
                      var side3 = -1;
                    }
                  }
                  var qty3 = tarani;
                }
                if (nikita == 1) {
                  if (riana == "CE") {
                    var symbol4 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_four +
                      ce;
                    if (minami == "BUY") {
                      var side4 = 1;
                    } else {
                      var side4 = -1;
                    }
                  } else {
                    var symbol4 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_four +
                      pe;
                    if (minami == "BUY") {
                      var side4 = 1;
                    } else {
                      var side4 = -1;
                    }
                  }
                  var qty4 = nayara;
                }
                function delay(ms) {
                  return new Promise((resolve) => setTimeout(resolve, ms));
                }
                if (symbol1) {
                  var order1 = this.orderPlace(symbol1, qty1, side1, tag1);
                }
                await delay(samuelD);
                if (symbol2) {
                  var order2 = this.orderPlace(symbol2, qty2, side2, tag2);
                }
                await delay(younaD);
                if (symbol3) {
                  var order3 = this.orderPlace(symbol3, qty3, side3, tag3);
                }
                await delay(tinaraD);
                if (symbol4) {
                  var order4 = this.orderPlace(symbol4, qty4, side4, tag4);
                }
                await delay(nikitaD);
                xioroberie = 2;
                money_heist = 3;
              } else if (xioroberie === 2) {
                var pe = "PE";
                var ce = "CE";
                var CEX = Math.floor(ltp / 100) * 100;
                var PEX = Math.ceil(ltp / 100) * 100;

                let ce_ltp_one = CEX;
                let ce_ltp_two = CEX + jimsimons;
                let ce_ltp_three = CEX + rinaya;
                let ce_ltp_four = CEX + lanaya;

                let pe_ltp_one = PEX;
                let pe_ltp_two = PEX + jimsimons;
                let pe_ltp_three = PEX + rinaya;
                let pe_ltp_four = PEX + lanaya;

                if (esara == 1) {
                  if (dhavithu === "CE") {
                    var symbol1 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_one +
                      ce;
                    if (wasp == "BUY") {
                      var side1 = 1;
                    } else {
                      var side1 = -1;
                    }
                  } else {
                    var symbol1 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_one +
                      pe;
                    if (wasp == "BUY") {
                      var side1 = 1;
                    } else {
                      var side1 = -1;
                    }
                  }
                  var qty1 = sergio;
                }
                if (negeymiya == 1) {
                  if (paul == "CE") {
                    var symbol2 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_two +
                      ce;
                    if (scottlang == "BUY") {
                      var side2 = 1;
                    } else {
                      var side2 = -1;
                    }
                  } else {
                    var symbol2 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_two +
                      pe;
                    if (scottlang == "BUY") {
                      var side2 = 1;
                    } else {
                      var side2 = -1;
                    }
                  }
                  var qty2 = gaztambide;
                }
                if (rayana == 1) {
                  if (zenara == "CE") {
                    var symbol3 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_three +
                      ce;
                    if (nolita == "BUY") {
                      var side3 = 1;
                    } else {
                      var side3 = -1;
                    }
                  } else {
                    var symbol3 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_three +
                      pe;
                    if (nolita == "BUY") {
                      var side3 = 1;
                    } else {
                      var side3 = -1;
                    }
                  }
                  var qty3 = sarian;
                }
                if (mialin == 1) {
                  if (larina == "CE") {
                    var symbol4 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_four +
                      ce;
                    if (karita == "BUY") {
                      var side4 = 1;
                    } else {
                      var side4 = -1;
                    }
                  } else {
                    var symbol4 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_four +
                      pe;
                    if (karita == "BUY") {
                      var side4 = 1;
                    } else {
                      var side4 = -1;
                    }
                  }
                  var qty4 = yarina;
                }
                function delay(ms) {
                  return new Promise((resolve) => setTimeout(resolve, ms));
                }
                if (symbol1) {
                  var order1 = this.orderPlace(symbol1, qty1, side1, tag1);
                }
                await delay(esaraD);
                if (symbol2) {
                  var order2 = this.orderPlace(symbol2, qty2, side2, tag2);
                }
                await delay(negeymiyaD);
                if (symbol3) {
                  var order3 = this.orderPlace(symbol3, qty3, side3, tag3);
                }
                await delay(rayanaD);
                if (symbol4) {
                  var order4 = this.orderPlace(symbol4, qty4, side4, tag4);
                }
                await delay(mialinD);
                xioroberie = 3;
                money_heist = 3;
              } else if (xioroberie === 3) {
                warx += 1;
                if (warsaack > warx) {
                  var pe = "PE";
                  var ce = "CE";
                  var CEX = Math.floor(ltp / 100) * 100;
                  var PEX = Math.ceil(ltp / 100) * 100;

                  let ce_ltp_one = CEX;
                  let ce_ltp_two = CEX + reymon;
                  let ce_ltp_three = CEX + dhab;
                  let ce_ltp_four = CEX + kyox;

                  let pe_ltp_one = PEX;
                  let pe_ltp_two = PEX + reymon;
                  let pe_ltp_three = PEX + dhab;
                  let pe_ltp_four = PEX + kyox;

                  if (yusaf == 1) {
                    if (aherth === "CE") {
                      var symbol1 =
                        "NSE:" +
                        galaxy_name_options +
                        expiryDate +
                        ce_ltp_one +
                        ce;
                      if (pajio == "BUY") {
                        var side1 = 1;
                      } else {
                        var side1 = -1;
                      }
                    } else {
                      var symbol1 =
                        "NSE:" +
                        galaxy_name_options +
                        expiryDate +
                        pe_ltp_one +
                        pe;
                      if (pajio == "BUY") {
                        var side1 = 1;
                      } else {
                        var side1 = -1;
                      }
                    }
                    var qty1 = ferik;
                  }
                  if (agarew == 1) {
                    if (jsoh == "CE") {
                      var symbol2 =
                        "NSE:" +
                        galaxy_name_options +
                        expiryDate +
                        ce_ltp_two +
                        ce;
                      if (cerso == "BUY") {
                        var side2 = 1;
                      } else {
                        var side2 = -1;
                      }
                    } else {
                      var symbol2 =
                        "NSE:" +
                        galaxy_name_options +
                        expiryDate +
                        pe_ltp_two +
                        pe;
                      if (cerso == "BUY") {
                        var side2 = 1;
                      } else {
                        var side2 = -1;
                      }
                    }
                    var qty2 = atbis;
                  }
                  if (syuo == 1) {
                    if (vase == "CE") {
                      var symbol3 =
                        "NSE:" +
                        galaxy_name_options +
                        expiryDate +
                        ce_ltp_three +
                        ce;
                      if (yelop == "BUY") {
                        var side3 = 1;
                      } else {
                        var side3 = -1;
                      }
                    } else {
                      var symbol3 =
                        "NSE:" +
                        galaxy_name_options +
                        expiryDate +
                        pe_ltp_three +
                        pe;
                      if (yelop == "BUY") {
                        var side3 = 1;
                      } else {
                        var side3 = -1;
                      }
                    }
                    var qty3 = xhiog;
                  }
                  if (malqo == 1) {
                    if (malzsi == "CE") {
                      var symbol4 =
                        "NSE:" +
                        galaxy_name_options +
                        expiryDate +
                        ce_ltp_four +
                        ce;
                      if (zamiuo == "BUY") {
                        var side4 = 1;
                      } else {
                        var side4 = -1;
                      }
                    } else {
                      var symbol4 =
                        "NSE:" +
                        galaxy_name_options +
                        expiryDate +
                        pe_ltp_four +
                        pe;
                      if (zamiuo == "BUY") {
                        var side4 = 1;
                      } else {
                        var side4 = -1;
                      }
                    }
                    var qty4 = casca;
                  }
                  function delay(ms) {
                    return new Promise((resolve) => setTimeout(resolve, ms));
                  }
                  if (symbol1) {
                    var order1 = this.orderPlace(symbol1, qty1, side1, tag1);
                  }
                  await delay(yusafD);
                  if (symbol2) {
                    var order2 = this.orderPlace(symbol2, qty2, side2, tag2);
                  }
                  await delay(agarewD);
                  if (symbol3) {
                    var order3 = this.orderPlace(symbol3, qty3, side3, tag3);
                  }
                  await delay(syuoD);
                  if (symbol4) {
                    var order4 = this.orderPlace(symbol4, qty4, side4, tag4);
                  }
                  await delay(malqoD);
                  xioroberie = 1;
                  money_heist = 3;
                } else {
                  warx += 1;
                  xioroberie = 1;
                  money_heist = 4;
                }
              }
            } else {
              money_heist = 2;
            }
          } else if (money_heist === 3) {
            if (ltp <= blackpanther) {
              function delay(ms) {
                return new Promise((resolve) => setTimeout(resolve, ms));
              }
              if (symbol4) {
                if (order4) {
                  if (side4 == 1) {
                    side4 = -1;
                  } else if (side4 == -1) {
                    side4 = 1;
                  }

                  var order4 = this.orderPlace(symbol4, qty4, side4, tag4);
                  order4 = 0;
                  symbol4 = 0;
                }
              }
              await delay(order4delay);
              if (symbol3) {
                if (order3) {
                  if (side3 == 1) {
                    side3 = -1;
                  } else if (side3 == -1) {
                    side3 = 1;
                  }

                  var order3 = this.orderPlace(symbol3, qty3, side3, tag3);
                  order3 = 0;
                  symbol3 = 0;
                }
              }
              await delay(order3delay);
              if (symbol2) {
                if (order2) {
                  if (side2 == 1) {
                    side2 = -1;
                  } else if (side2 == -1) {
                    side2 = 1;
                  }

                  var order2 = this.orderPlace(symbol2, qty2, side2, tag2);
                  order2 = 0;
                  symbol2 = 0;
                }
              }
              await delay(order2delay);
              if (symbol1) {
                if (order1) {
                  if (side1 == 1) {
                    side1 = -1;
                  } else if (side1 == -1) {
                    side1 = 1;
                  }

                  var order1 = this.orderPlace(symbol1, qty1, side1, tag1);
                  order1 = 0;
                  symbol1 = 0;
                }
              }
              await delay(order1delay);
              warx += 1;
              xioroberie = 1;

              if (warsaack > warx) {
                var pe = "PE";
                var ce = "CE";
                var CEX = Math.floor(ltp / 100) * 100;
                var PEX = Math.ceil(ltp / 100) * 100;

                let ce_ltp_one = CEX;
                let ce_ltp_two = CEX + carlicahn;
                let ce_ltp_three = CEX + chidin;
                let ce_ltp_four = CEX + amarac;

                let pe_ltp_one = PEX;
                let pe_ltp_two = PEX + carlicahn;
                let pe_ltp_three = PEX + chidin;
                let pe_ltp_four = PEX + amarac;

                if (obadhiya == 1) {
                  if (abharaham === "CE") {
                    var symbol1 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_one +
                      ce;
                    if (falcon == "BUY") {
                      var side1 = 1;
                    } else {
                      var side1 = -1;
                    }
                  } else {
                    var symbol1 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_one +
                      pe;
                    if (falcon == "BUY") {
                      var side1 = 1;
                    } else {
                      var side1 = -1;
                    }
                  }
                  var qty1 = palermo;
                }
                if (jerslm == 1) {
                  if (peter == "CE") {
                    var symbol2 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_two +
                      ce;
                    if (wandamaximoff == "BUY") {
                      var side2 = 1;
                    } else {
                      var side2 = -1;
                    }
                  } else {
                    var symbol2 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_two +
                      pe;
                    if (wandamaximoff == "BUY") {
                      var side2 = 1;
                    } else {
                      var side2 = -1;
                    }
                  }
                  var qty2 = alicia;
                }
                if (adaeze == 1) {
                  if (niaowu == "CE") {
                    var symbol3 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_three +
                      ce;
                    if (aissat == "BUY") {
                      var side3 = 1;
                    } else {
                      var side3 = -1;
                    }
                  } else {
                    var symbol3 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_three +
                      pe;
                    if (aissat == "BUY") {
                      var side3 = 1;
                    } else {
                      var side3 = -1;
                    }
                  }
                  var qty3 = thando;
                }
                if (zainab == 1) {
                  if (leboga == "CE") {
                    var symbol4 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_four +
                      ce;
                    if (nefert == "BUY") {
                      var side4 = 1;
                    } else {
                      var side4 = -1;
                    }
                  } else {
                    var symbol4 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_four +
                      pe;
                    if (nefert == "BUY") {
                      var side4 = 1;
                    } else {
                      var side4 = -1;
                    }
                  }
                  var qty4 = aminat;
                }
                function delay(ms) {
                  return new Promise((resolve) => setTimeout(resolve, ms));
                }
                if (symbol1) {
                  var order1 = this.orderPlace(symbol1, qty1, side1, tag1);
                }
                await delay(obadhiyaD);
                if (symbol2) {
                  var order2 = this.orderPlace(symbol2, qty2, side2, tag2);
                }
                await delay(jerslmD);
                if (symbol3) {
                  var order3 = this.orderPlace(symbol3, qty3, side3, tag3);
                }
                await delay(adaezeD);
                if (symbol4) {
                  var order4 = this.orderPlace(symbol4, qty4, side4, tag4);
                }
                await delay(zainabD);
                var tonystark = blackpanther;
                var blackpanther = tonystark - pythagoras;
                var doctorstrange = tonystark + euler;
                var spiderman = doctorstrange + antoine;
                money_heist = 3;
              } else {
                money_heist = 4;
              }
            } else if (doctorstrange <= ltp) {
              function delay(ms) {
                return new Promise((resolve) => setTimeout(resolve, ms));
              }
              if (symbol4) {
                if (order4) {
                  if (side4 == 1) {
                    side4 = -1;
                  } else if (side4 == -1) {
                    side4 = 1;
                  }

                  var order4 = this.orderPlace(symbol4, qty4, side4, tag4);
                  order4 = 0;
                  symbol4 = 0;
                }
              }
              await delay(order4delay);
              if (symbol3) {
                if (order3) {
                  if (side3 == 1) {
                    side3 = -1;
                  } else if (side3 == -1) {
                    side3 = 1;
                  }

                  var order3 = this.orderPlace(symbol3, qty3, side3, tag3);
                  order3 = 0;
                  symbol3 = 0;
                }
              }
              await delay(order3delay);
              if (symbol2) {
                if (order2) {
                  if (side2 == 1) {
                    side2 = -1;
                  } else if (side2 == -1) {
                    side2 = 1;
                  }

                  var order2 = this.orderPlace(symbol2, qty2, side2, tag2);
                  order2 = 0;
                  symbol2 = 0;
                }
              }
              await delay(order2delay);
              if (symbol1) {
                if (order1) {
                  if (side1 == 1) {
                    side1 = -1;
                  } else if (side1 == -1) {
                    side1 = 1;
                  }

                  var order1 = this.orderPlace(symbol1, qty1, side1, tag1);
                  order1 = 0;
                  symbol1 = 0;
                }
              }
              await delay(order1delay);

              if (xioroberie === 1) {
                var pe = "PE";
                var ce = "CE";
                var CEX = Math.floor(ltp / 100) * 100;
                var PEX = Math.ceil(ltp / 100) * 100;

                let ce_ltp_one = CEX;
                let ce_ltp_two = CEX + johnpaulson;
                let ce_ltp_three = CEX + ashant;
                let ce_ltp_four = CEX + kahina;

                let pe_ltp_one = PEX;
                let pe_ltp_two = PEX + johnpaulson;
                let pe_ltp_three = PEX + ashant;
                let pe_ltp_four = PEX + kahina;

                if (dhobiyashu == 1) {
                  if (eesak === "CE") {
                    var symbol1 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_one +
                      ce;
                    if (jamesrhodes == "BUY") {
                      var side1 = 1;
                    } else {
                      var side1 = -1;
                    }
                  } else {
                    var symbol1 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_one +
                      pe;
                    if (jamesrhodes == "BUY") {
                      var side1 = 1;
                    } else {
                      var side1 = -1;
                    }
                  }
                  var qty1 = marseille;
                }
                if (salamoon == 1) {
                  if (dhaniyel == "CE") {
                    var symbol2 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_two +
                      ce;
                    if (wintersoldier == "BUY") {
                      var side2 = 1;
                    } else {
                      var side2 = -1;
                    }
                  } else {
                    var symbol2 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_two +
                      pe;
                    if (wintersoldier == "BUY") {
                      var side2 = 1;
                    } else {
                      var side2 = -1;
                    }
                  }
                  var qty2 = gandía;
                }
                if (aliyah == 1) {
                  if (leonia == "CE") {
                    var symbol3 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_three +
                      ce;
                    if (sabina == "BUY") {
                      var side3 = 1;
                    } else {
                      var side3 = -1;
                    }
                  } else {
                    var symbol3 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_three +
                      pe;
                    if (sabina == "BUY") {
                      var side3 = 1;
                    } else {
                      var side3 = -1;
                    }
                  }
                  var qty3 = yaraa;
                }
                if (azania == 1) {
                  if (zuriya == "CE") {
                    var symbol4 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_four +
                      ce;
                    if (leila == "BUY") {
                      var side4 = 1;
                    } else {
                      var side4 = -1;
                    }
                  } else {
                    var symbol4 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_four +
                      pe;
                    if (leila == "BUY") {
                      var side4 = 1;
                    } else {
                      var side4 = -1;
                    }
                  }
                  var qty4 = malaik;
                }
                function delay(ms) {
                  return new Promise((resolve) => setTimeout(resolve, ms));
                }
                if (symbol1) {
                  var order1 = this.orderPlace(symbol1, qty1, side1, tag1);
                }
                await delay(dhobiyashuD);
                if (symbol2) {
                  var order2 = this.orderPlace(symbol2, qty2, side2, tag2);
                }
                await delay(salamoonD);
                if (symbol3) {
                  var order3 = this.orderPlace(symbol3, qty3, side3, tag3);
                }
                await delay(aliyahD);
                if (symbol4) {
                  var order4 = this.orderPlace(symbol4, qty4, side4, tag4);
                }
                await delay(azaniaD);
                xioroberie = 2;
                money_heist = 2;
              } else if (xioroberie === 2) {
                var pe = "PE";
                var ce = "CE";
                var CEX = Math.floor(ltp / 100) * 100;
                var PEX = Math.ceil(ltp / 100) * 100;

                let ce_ltp_one = CEX;
                let ce_ltp_two = CEX + stevecohen;
                let ce_ltp_three = CEX + asant;
                let ce_ltp_four = CEX + kaliy;

                let pe_ltp_one = PEX;
                let pe_ltp_two = PEX + stevecohen;
                let pe_ltp_three = PEX + asant;
                let pe_ltp_four = PEX + kaliy;

                if (dhomaiyar == 1) {
                  if (yakobu === "CE") {
                    var symbol1 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_one +
                      ce;
                    if (peterquill == "BUY") {
                      var side1 = 1;
                    } else {
                      var side1 = -1;
                    }
                  } else {
                    var symbol1 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_one +
                      pe;
                    if (peterquill == "BUY") {
                      var side1 = 1;
                    } else {
                      var side1 = -1;
                    }
                  }
                  var qty1 = esther;
                }
                if (dhobithu == 1) {
                  if (israyl == "CE") {
                    var symbol2 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_two +
                      ce;
                    if (loki == "BUY") {
                      var side2 = 1;
                    } else {
                      var side2 = -1;
                    }
                  } else {
                    var symbol2 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_two +
                      pe;
                    if (loki == "BUY") {
                      var side2 = 1;
                    } else {
                      var side2 = -1;
                    }
                  }
                  var qty2 = rodrigo;
                }
                if (eshe == 1) {
                  if (imani == "CE") {
                    var symbol3 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_three +
                      ce;
                    if (selma == "BUY") {
                      var side3 = 1;
                    } else {
                      var side3 = -1;
                    }
                  } else {
                    var symbol3 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_three +
                      pe;
                    if (selma == "BUY") {
                      var side3 = 1;
                    } else {
                      var side3 = -1;
                    }
                  }
                  var qty3 = nasra;
                }
                if (nayla == 1) {
                  if (sanya == "CE") {
                    var symbol4 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      ce_ltp_four +
                      ce;
                    if (nubia == "BUY") {
                      var side4 = 1;
                    } else {
                      var side4 = -1;
                    }
                  } else {
                    var symbol4 =
                      "NSE:" +
                      galaxy_name_options +
                      expiryDate +
                      pe_ltp_four +
                      pe;
                    if (nubia == "BUY") {
                      var side4 = 1;
                    } else {
                      var side4 = -1;
                    }
                  }
                  var qty4 = nayarai;
                }
                function delay(ms) {
                  return new Promise((resolve) => setTimeout(resolve, ms));
                }
                if (symbol1) {
                  var order1 = this.orderPlace(symbol1, qty1, side1, tag1);
                }
                await delay(dhomaiyarD);
                if (symbol2) {
                  var order2 = this.orderPlace(symbol2, qty2, side2, tag2);
                }
                await delay(dhobithuD);
                if (symbol3) {
                  var order3 = this.orderPlace(symbol3, qty3, side3, tag3);
                }
                await delay(esheD);
                if (symbol4) {
                  var order4 = this.orderPlace(symbol4, qty4, side4, tag4);
                }
                await delay(naylaD);
                xioroberie = 3;
                money_heist = 2;
              } else if (xioroberie === 3) {
                warx += 1;

                if (warsaack > warx) {
                  var pe = "PE";
                  var ce = "CE";
                  var CEX = Math.floor(ltp / 100) * 100;
                  var PEX = Math.ceil(ltp / 100) * 100;

                  let ce_ltp_one = CEX;
                  let ce_ltp_two = CEX + farzi;
                  let ce_ltp_three = CEX + berloy;
                  let ce_ltp_four = CEX + naqio;

                  let pe_ltp_one = PEX;
                  let pe_ltp_two = PEX + farzi;
                  let pe_ltp_three = PEX + berloy;
                  let pe_ltp_four = PEX + naqio;

                  if (yuwok == 1) {
                    if (lasrt === "CE") {
                      var symbol1 =
                        "NSE:" +
                        galaxy_name_options +
                        expiryDate +
                        ce_ltp_one +
                        ce;
                      if (meltonin == "BUY") {
                        var side1 = 1;
                      } else {
                        var side1 = -1;
                      }
                    } else {
                      var symbol1 =
                        "NSE:" +
                        galaxy_name_options +
                        expiryDate +
                        pe_ltp_one +
                        pe;
                      if (meltonin == "BUY") {
                        var side1 = 1;
                      } else {
                        var side1 = -1;
                      }
                    }
                    var qty1 = kmoep;
                  }
                  if (douzi == 1) {
                    if (nawohg == "CE") {
                      var symbol2 =
                        "NSE:" +
                        galaxy_name_options +
                        expiryDate +
                        ce_ltp_two +
                        ce;
                      if (dayois == "BUY") {
                        var side2 = 1;
                      } else {
                        var side2 = -1;
                      }
                    } else {
                      var symbol2 =
                        "NSE:" +
                        galaxy_name_options +
                        expiryDate +
                        pe_ltp_two +
                        pe;
                      if (dayois == "BUY") {
                        var side2 = 1;
                      } else {
                        var side2 = -1;
                      }
                    }
                    var qty2 = ayohs;
                  }
                  if (kasew == 1) {
                    if (mahasy == "CE") {
                      var symbol3 =
                        "NSE:" +
                        galaxy_name_options +
                        expiryDate +
                        ce_ltp_three +
                        ce;
                      if (kegzhe == "BUY") {
                        var side3 = 1;
                      } else {
                        var side3 = -1;
                      }
                    } else {
                      var symbol3 =
                        "NSE:" +
                        galaxy_name_options +
                        expiryDate +
                        pe_ltp_three +
                        pe;
                      if (kegzhe == "BUY") {
                        var side3 = 1;
                      } else {
                        var side3 = -1;
                      }
                    }
                    var qty3 = gevez;
                  }
                  if (namgh == 1) {
                    if (porix == "CE") {
                      var symbol4 =
                        "NSE:" +
                        galaxy_name_options +
                        expiryDate +
                        ce_ltp_four +
                        ce;
                      if (aeuvi == "BUY") {
                        var side4 = 1;
                      } else {
                        var side4 = -1;
                      }
                    } else {
                      var symbol4 =
                        "NSE:" +
                        galaxy_name_options +
                        expiryDate +
                        pe_ltp_four +
                        pe;
                      if (aeuvi == "BUY") {
                        var side4 = 1;
                      } else {
                        var side4 = -1;
                      }
                    }
                    var qty4 = lavas;
                  }
                  function delay(ms) {
                    return new Promise((resolve) => setTimeout(resolve, ms));
                  }
                  if (symbol1) {
                    var order1 = this.orderPlace(symbol1, qty1, side1, tag1);
                  }
                  await delay(yuwokD);
                  if (symbol2) {
                    var order2 = this.orderPlace(symbol2, qty2, side2, tag2);
                  }
                  await delay(douziD);
                  if (symbol3) {
                    var order3 = this.orderPlace(symbol3, qty3, side3, tag3);
                  }
                  await delay(kasewD);
                  if (symbol4) {
                    var order4 = this.orderPlace(symbol4, qty4, side4, tag4);
                  }
                  await delay(namghD);
                  warx += 1;
                  xioroberie = 1;
                  money_heist = 2;
                } else {
                  warx += 1;
                  xioroberie = 1;
                  money_heist = 4;
                }
              }
            } else {
              money_heist = 3;
            }
          }
        } else {
          money_heist = 4;
        }
      } else if (alien <= time) {
        warx = 0;
        xioroberie = 0;
        engine = "OFF";
      }
    }
   
  } catch (error) {
    console.log(error);
  }
  return null;
};

async function order_form(fyers, symbol, qty, side, orderTag) {
  const reqBody = {
    symbol: symbol,
    qty: qty,
    type: 2,
    side: side,
    productType: "INTRADAY",
    limitPrice: 0,
    stopPrice: 0,
    disclosedQty: 0,
    validity: "DAY",
    offlineOrder: false,
    stopLoss: 0,
    takeProfit: 0,
    orderTag: orderTag.replace(/[^a-zA-Z0-9]/g, ""),
  };
  try {
    const response = await fyers.place_order(reqBody);
  } catch (error) {}
}

module.exports.orderPlace = async (symbol, qty, side, tag) => {
  try {
    var fyers = new FyersAPI();
    fyers.setAppId(appId);
    fyers.setRedirectUrl(url);
    fyers.setAccessToken(access_token);

    var baseOrderTag = "order";
    let loopCounter = tag;
    while (qty > 0) {
      var currentQty = Math.min(qty, 900);

      let orderTag = `${baseOrderTag}${loopCounter}`;

      await order_form(fyers, symbol, currentQty, side, orderTag);

      qty -= currentQty;

      loopCounter = loopCounter + 0.1;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};
