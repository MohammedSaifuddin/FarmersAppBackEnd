const express = require('express');
var nodemailer = require('nodemailer');

// var io = require("socket.io")(http);
// io.onconnection("connection", function(socket) {
//     console.log("User Connected", socket.id)

//     socket.on("new_message", function(data) {
//         console.log("Client Says ::", data);
//     })
// });


function createRouter(db) {
    const router = express.Router();
    const owner = '';
    // the routes are defined here
    router.get("/", function(request, result) {
        result.send("Hello World");
    });
    router.get('/event', (req, res, next) => {
        db.query(
            'Select * from BOOKING',
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    // res.status(200).json({ status: 'ok' });
                    res.status(200).json(results);
                    console.log("Retrieved Booking Data" + JSON.stringify(results));
                }
            }
        );
    });

    router.get('/buyer_crops_for_farmer', (req, res, next) => {
        db.query(
            'Select * from buyer_crops',
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    // res.status(200).json({ status: 'ok' });
                    res.status(200).json(results);
                    console.log("Retrieved Crops Data" + JSON.stringify(results));
                }
            }
        );
    });
    router.get('/crops', (req, res, next) => {
        db.query(
            'Select * from crops',
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    // res.status(200).json({ status: 'ok' });
                    res.status(200).json(results);
                    console.log("Retrieved Crops Data" + JSON.stringify(results));
                }
            }
        );
    });
    //userdata_for_crops

    router.get('/userdata_for_crops/:id', (req, res, next) => {
        var id = req.params.id;
        db.query(
            'Select * from accounts where id = ?', id,
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    // res.status(200).json({ status: 'ok' });
                    res.status(200).json(results);
                    console.log("Retrieved User Data For Single Crop" + JSON.stringify(results));
                }
            }
        );
    });


    router.get('/buyer_crops_by_id/:id', (req, res, next) => {
        var id = req.params.id;
        db.query(
            'Select * from buyer_crops where id = ?', id,
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    // res.status(200).json({ status: 'ok' });
                    res.status(200).json(results);
                    console.log("Retrieved Buyer Crops Data" + JSON.stringify(results));
                }
            }
        );
    });
    router.get('/crops_by_id/:id', (req, res, next) => {
        var id = req.params.id;
        db.query(
            'Select * from crops where id = ?', id,
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    // res.status(200).json({ status: 'ok' });
                    res.status(200).json(results);
                    console.log("Retrieved Crops Data" + JSON.stringify(results));
                }
            }
        );
    });
    // get_all_farming_tips
    router.get('/get_all_farming_tips', (req, res, next) => {
        db.query(
            'Select * from farming_tips',
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    // res.status(200).json({ status: 'ok' });
                    res.status(200).json(results);
                    console.log("Retrieved Farming Tips" + JSON.stringify(results));
                }
            }
        );
    });
    router.get('/get_all_complaint_data', (req, res, next) => {
        db.query(
            'Select * from complaints',
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    // res.status(200).json({ status: 'ok' });
                    res.status(200).json(results);
                    console.log("Retrieved complaints Data" + JSON.stringify(results));
                }
            }
        );
    });
    router.get('/get_complaint_data/:id', (req, res, next) => {
        var id = req.params.id;
        db.query(
            'Select * from complaints where complaint_by_farmer_id = ?', id,
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    // res.status(200).json({ status: 'ok' });
                    res.status(200).json(results);
                    console.log("Retrieved complaints Data" + JSON.stringify(results));
                }
            }
        );
    });
    router.post('/account_data', (req, res, next) => {
        var data = req.body;
        console.log("Data :=" + data);
        db.query(
            'Insert into accounts SET ?', data,
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'Error' });
                } else {
                    // res.status(200).json({ status: 'ok' });
                    res.status(200).json(results);
                    console.log("Entering Registration  Data" + JSON.stringify(results));
                }
            }
        );
        console.log("Email id :==" + data.email)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'open.project19@gmail.com',
                pass: 'Qwerty@123'
            }
        });

        var mailOptions = {
            from: 'open.project19@gmail.com',
            fromname: 'Farmers-App',
            to: data.email,
            subject: 'Congratulations you have succesfully Registered',
            text: 'Username is : ' + data.username + '\n password is  : ' + data.password + ' \n Role:' + data.role
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });

    router.get('/get_account/data/:email/:password/:type', (req, res, next) => {
        var email = req.params.email;
        var password = req.params.password;
        var type = req.params.type;
        // var data = req.body;
        console.log("Data :=" + email, password, type);
        db.query(
            'Select id,email,password,role from accounts where email = ? AND password = ?', [email, password],
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'Error' });
                } else {
                    // res.status(200).json({ status: 'ok' });
                    res.status(200).json(results);
                    console.log("Retrieved User Details :: " + JSON.stringify(results));
                }
            }
        );
    });
    // UPDATE table_name
    // SET column1 = value1, column2 = value2, ...
    // WHERE condition;

    router.get('/set_complaint_status/:status', (req, res, next) => {
        var id = req.params.status;
        db.query(
            'Update complaints SET complaint_status = 1 Where id = ? AND complaint_status = 0', id,
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    // res.status(200).json({ status: 'ok' });
                    res.status(200).json(results);
                    console.log("set complaints Data" + JSON.stringify(results));
                }
            }
        );
    });
    // router.post('/set_complaint_status/:status', (req, res, next) => {
    //     console.log("DATA IS :::" + req.body)
    //     var data = req.body;

    //     console.log("Data for setting complaint status :=" + data);
    //     db.query(
    //         'Update complaints SET complaint_status = 1 Where id = ? AND complaint_status = 0 ', data,
    //         (error, results) => {
    //             if (error) {
    //                 console.error(error);
    //                 res.status(500).json({ status: 'Error' });
    //             } else {
    //                 // res.status(200).json({ status: 'ok' });
    //                 res.status(200).json(results);
    //                 console.log("Entering Crops  Data" + JSON.stringify(results));
    //             }
    //         }
    //     );
    // })


    router.post('/product_data', (req, res, next) => {
        var data = req.body;
        console.log("Data :=" + data);
        db.query(
            'Insert into crops SET ?', data,
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'Error' });
                } else {
                    // res.status(200).json({ status: 'ok' });
                    res.status(200).json(results);
                    console.log("Entering Crops  Data" + JSON.stringify(results));
                }
            }
        );


        // console.log("Email id :==" + data.email)
        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'open.project19@gmail.com',
        //         pass: 'Qwerty@123'
        //     }
        // });

        // var mailOptions = {
        //     from: 'open.project19@gmail.com',
        //     fromname: 'Farmers-App',
        //     to: data.email,
        //     subject: 'Sending Email using Node.js',
        //     text: 'Username is : ' + data.username + '\n password is  : ' + data.password
        // };

        // transporter.sendMail(mailOptions, function(error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // });
    });
    router.post('/buyer_product_data', (req, res, next) => {
        var data = req.body;
        console.log("Data :=" + data);
        db.query(
            'Insert into buyer_crops SET ?', data,
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'Error' });
                } else {
                    // res.status(200).json({ status: 'ok' });
                    res.status(200).json(results);
                    console.log("Entering Crops  Data" + JSON.stringify(results));
                }
            }
        );
    });


    router.post('/farming_tip', (req, res, next) => {
        var data = req.body;
        console.log("Data :=" + data);
        db.query(
            'Insert into farming_tips SET ?', data,
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'Error' });
                } else {
                    // res.status(200).json({ status: 'ok' });
                    res.status(200).json(results);
                    console.log("Entering Complaints  Data" + JSON.stringify(results));
                }
            }
        );
    });
    router.post('/complaint_data', (req, res, next) => {
        var data = req.body;
        console.log("Data :=" + data);
        db.query(
            'Insert into complaints SET ?', data,
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'Error' });
                } else {
                    // res.status(200).json({ status: 'ok' });
                    res.status(200).json(results);
                    console.log("Entering Complaints  Data" + JSON.stringify(results));
                }
            }
        );
        // console.log("Email id :==" + data.email)
        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'open.project19@gmail.com',
        //         pass: 'Qwerty@123'
        //     }
        // });

        // var mailOptions = {
        //     from: 'open.project19@gmail.com',
        //     fromname: 'Farmers-App',
        //     to: data.email,
        //     subject: 'Sending Email using Node.js',
        //     text: 'Username is : ' + data.username + '\n password is  : ' + data.password
        // };

        // transporter.sendMail(mailOptions, function(error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // });
    });
    return router; //get_account_data/
}
module.exports = createRouter;