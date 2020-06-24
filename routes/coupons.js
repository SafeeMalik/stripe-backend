var express = require('express');
var router = express.Router();
var stripe = require('stripe')('sk_test_51GxRXvEtBzyYs5GgClU0rqVjLPaw1EXL5zo1LjckcyLeOUHDnZ3Edl5djkHNiSZdPUynTwV3JIhvPKB1h4hdwMqf00Ugmt1tPe');

/* GET coupon listing. */
router.get('/listCoupons', function (req, res, next) {
    // res.send('respond with a list of available Coupons');
    stripe.coupons.list(
        // { limit: 3 },
        function (err, coupons) {
            // asynchronously called
            if (err) {
                res.send('Cannot display coupons');
            } else {
                res.send(coupons);
                console.log(coupons);
            }
        }
    );
});

/* POST coupon */
router.post('/createCoupon', (req, res, next) => {
    stripe.coupons.create(
        {
            percent_off: req.body.perc_off,
            duration: 'repeating',
            duration_in_months: req.body.duration_in_months,
        },
        function (err, coupon) {
            // asynchronously called
            if (err) {
                console.log('Error creating coupon');
                res.send({
                    success: false,
                    msg: 'Cannot Create Coupon'
                })
            } else {
                res.send({
                    success: true,
                    msg: 'Coupon created'
                })
                console.log(coupon);
            }
        }
    );
});

/*Delete Coupon */
router.delete('/deleteCoupon', (req, res, next) => {
    console.log(req.body)
    stripe.coupons.del(
        req.body.couponID,
        function (err, confirmation) {
            // asynchronously called
            if (err) {
                console.log(err)
                res.send({
                    success: false,
                    msg: 'Coupon could not be deleted'
                })
            } else {
                console.log(confirmation);
                res.send({
                    success: true,
                    msg: 'Coupon deleted',
                    result: confirmation
                })
            }
        }
    );
})

module.exports = router;
