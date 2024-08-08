const { response } = require("../service/Response");
const { CatchAsyncError } = require("../error/CatchAsyncError");
const { Store } = require("../models/Store");
const { 
    Categories, 
    Menu, 
    Taxes, 
    Discount, 
    OrderType, 
    SubOrderTypes, 
    Items, 
    AddonGroups, 
    Attributes, 
    Variation, 
    Coupon 
} = require("../models/Menu");

exports.push_menu = CatchAsyncError(async (req, res) => {
    try {
        const data = req.body;

        // Check if the store exists
        const checkTheStore = await Store.findOne({ store_id: data.restaurants[0].restaurantid });
        if (!checkTheStore) {
            return response(res, 'Store does not exist, please create store first!', {}, 401);
        }

        // Add/Update Categories and Menu
        for (let category of data.categories) {
            const { categoryid, active, parent_category_id, categorytimings, categoryname, category_image_url } = category;
            let isChild = parent_category_id !== "0";

            await Categories.findOneAndUpdate(
                { category_id: categoryid },
                {
                    category_name: categoryname,
                    category_id: categoryid,
                    active: active,
                    category_timing: categorytimings,
                    category_logo_url: category_image_url,
                    isChild: isChild,
                    parent_category: parent_category_id
                },
                { new: true, upsert: true }
            );

            await Menu.findOneAndUpdate(
                { storeId: data.restaurants[0].restaurantid, category_id: categoryid },
                {},
                { new: true, upsert: true }
            );
        }

        // Add/Update Taxes
        for (let tax of data.taxes) {
            console.log(data.taxes)
            console.log(tax)
            const { taxid, taxname, tax:taxValue, taxtype, tax_ordertype, active, tax_coreortotal, tax_taxtype, rank, consider_in_core_amount, description } = tax;
            
            await Taxes.findOneAndUpdate(
                { tax_id: taxid },
                {
                    tax_id: taxid,
                    tax_name: taxname,
                    tax: taxValue,
                    tax_type: taxtype,
                    tax_ordertype: tax_ordertype,
                    active: active,
                    tax_core_or_total: tax_coreortotal,
                    tax_taxtype: tax_taxtype,
                    rank: rank,
                    consider_in_core_amount: consider_in_core_amount,
                    description: description
                },
                { new: true, upsert: true }
            );
        }

        // Add/Update Discounts
        for (let discount of data.discounts) {
            const { discountid, discountname, discounttype, discount:discountValue, discountordertype, discountapplicableon, discountdays, active, discountontotal, discountstarts, discountends, discounttimefrom, discounttimeto, discountminamount, discountmaxamount, discounthascoupon, discountcategoryitemids, discountmaxlimit } = discount;

            await Discount.findOneAndUpdate(
                { discount_id: discountid },
                {
                    discount_name: discountname,
                    discount_type: discounttype,
                    discount: discountValue,
                    discount_order_type: discountordertype,
                    discount_applicableon: discountapplicableon,
                    discount_days: discountdays,
                    active: active,
                    discount_on_total: discountontotal,
                    discounts_starts: discountstarts,
                    discount_ends: discountends,
                    discount_time_from: discounttimefrom,
                    discount_time_to: discounttimeto,
                    discount_min_amount: discountminamount,
                    discount_max_amount: discountmaxamount,
                    discount_has_coupon: discounthascoupon,
                    discount_category_item_ids: discountcategoryitemids,
                    discount_max_limit: discountmaxlimit
                },
                { new: true, upsert: true }
            );
        }

        // Add/Update Order Types
        for (let ordertype of data.ordertypes) {
            const { ordertypeid, ordertype: ordertypeName } = ordertype;

            await OrderType.findOneAndUpdate(
                { order_type_id: ordertypeid },
                { order_type: ordertypeName },
                { new: true, upsert: true }
            );
        }

        // Add/Update Items
        for (let item of data.items) {
            const { itemid, itemname, itemdescription, online_menu_status, itemallowvariation, itemrank, item_categoryid, item_ordertype, item_packingcharges, ignore_taxes, ignore_discounts, in_stock, cuisine, variation_groupname, variation, addon, price, active, item_image_url, item_tax, gst_type, nutrition } = item;

            await Items.findOneAndUpdate(
                { item_id: itemid },
                {
                    item_name: itemname,
                    item_description: itemdescription,
                    online_menu_status: online_menu_status,
                    item_allow_variation: itemallowvariation,
                    item_rank: itemrank,
                    item_category_id: item_categoryid,
                    item_ordertype: item_ordertype,
                    item_packing_charges: item_packingcharges,
                    ignore_taxes: ignore_taxes,
                    ignore_discounts: ignore_discounts,
                    in_stock: in_stock,
                    cuisuine: cuisine,
                    variation_grounp_name: variation_groupname,
                    variation: variation,
                    addon: addon,
                    price: price,
                    active: active,
                    item_image_url: item_image_url,
                    item_tax: item_tax,
                    gst_type: gst_type,
                    nutrition: JSON.stringify(nutrition)
                },
                { new: true, upsert: true }
            );
        }

        // Add/Update Addon Groups
        for (let addongroup of data.addongroups) {
            const { addongroupid, addongroup_store_id, addongroup_rank, active, show_in_online, min_qty, max_qty, addongroupitems, addongroup_name } = addongroup;

            await AddonGroups.findOneAndUpdate(
                { addon_group_id: addongroupid },
                {
                    addon_group_store_id: addongroup_store_id,
                    addon_group_rank: addongroup_rank,
                    active: active,
                    show_in_online: show_in_online,
                    min_qty: min_qty,
                    max_qty: max_qty,
                    addon_group_items: addongroupitems,
                    addon_group_name: addongroup_name
                },
                { new: true, upsert: true }
            );
        }

        // Add/Update Attributes
        for (let attribute of data.attributes) {
            const { attributeid, attribute:attributeValue, active } = attribute;

            await Attributes.findOneAndUpdate(
                { attribute_id: attributeid },
                { attribute: attributeValue, active: active },
                { new: true, upsert: true }
            );
        }

        // Add/Update Variations
        for (let variation of data.variations) {
            const { variationid, name, groupname, status } = variation;

            await Variation.findOneAndUpdate(
                { variationId: variationid },
                { name: name, groupname: groupname, status: status },
                { new: true, upsert: true }
            );
        }

        // Add/Update Coupons
        // for (let coupon of data.coupons) {
        //     const { coupon_id, coupon_restaurant_id, coupon_discount_id, code, show_coupon, active, coupon_max_redem, user_wise_max_redem } = coupon;

        //     await Coupon.findOneAndUpdate(
        //         { coupon_id: coupon_id },
        //         {
        //             coupon_restaurant_id: coupon_restaurant_id,
        //             coupon_discount_id: coupon_discount_id,
        //             code: code,
        //             show_coupon: show_coupon,
        //             active: active,
        //             coupon_max_redem: coupon_max_redem,
        //             user_wise_max_redem: user_wise_max_redem
        //         },
        //         { new: true, upsert: true }
        //     );
        // }

        // Send success response
        response(res, 'Data stored successfully', data.restaurants, 201);
    } catch (error) {
        console.log(error)
        response(res, error.message, error, 500);
    }
});
