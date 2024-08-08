const mongoose = require('mongoose');

exports.Menu = mongoose.model('Menu', new mongoose.Schema({
    storeId: String,
    category_id: String,
    category_name: String,
}, { timestamps: true }));

exports.OrderType = mongoose.model('OrderType', new mongoose.Schema({
    order_type_id: String,
    order_type: String
}));

exports.Categories = mongoose.model('Categories', new mongoose.Schema({
    category_id: String,
    category_name: String,
    active: {
        type: Number,
        default: 1
    },
    isChild: Boolean,
    parent_category: String,
    category_timing: String,
    category_logo_url: String,
}, { timestamps: true }));

exports.Items = mongoose.model('Items', new mongoose.Schema({
    item_id: String,
    item_name: String,
    item_description: String,
    online_menu_status: String,
    item_allow_variation: String,
    item_store_id: String,
    item_rank: String,
    item_category_id: String,
    item_ordertype: String,
    item_packing_charges: String,
    ignore_taxes: String,
    ignore_discounts: String,
    in_stock: String,
    cuisine: [String],
    variation_group_name: String,
    variation: [{
        variationId: String,
        name: String,
        groupname: String,
        price: String,
        active: String,
        item_packing_charges: String,
        variationrank: String,
        addon: [{
            addon_group_id: String,
            addon_item_selection: String,
            addon_item_selection_min: String,
            addon_item_selection_max: String
        }],
        item_name: String,
    }],
    addon: [{
        addon_group_id: String,
        addon_item_selection: String,
        addon_item_selection_min: String,
        addon_item_selection_max: String
    }],
    price: String,
    active: String,
    item_name_2: String,
    item_image_url: String,
    item_tax: String,
    gst_type: String,
    nutrition: String
}, { timestamps: true }));

exports.Coupons = mongoose.model("Coupons", new mongoose.Schema({
    coupon_id: String,
    coupon_restaurant_id: String,
    coupon_discount_id: String,
    code: String,
    show_coupon: String,
    active: String,
    coupon_max_redem: String,
    user_wise_max_redem: String
}));

exports.SubOrderTypes = mongoose.model('SubOrderTypes', new mongoose.Schema({
    sub_order_type_id: String,
    sub_order_type_name: String,
    active: String,
}));

exports.Variation = mongoose.model('Variation', new mongoose.Schema({
    variationId: String,
    name: String,
    groupname: String,
    status: String,
}));

exports.AddonGroups = mongoose.model('AddonGroups', new mongoose.Schema({
    addon_group_id: String,
    addon_group_store_id: String,
    addon_group_rank: String,
    active: String,
    show_in_online: String,
    min_qty: String,
    max_qty: String,
    addon_group_items: [{
        addon_item_id: String,
        addon_item_name: String,
        addon_item_price: String,
        active: String,
        attributes: String,
        addon_item_rank: String,
        online_menu_status: String
    }],
    addon_group_name: String
}));

exports.Attributes = mongoose.model("Attributes", new mongoose.Schema({
    attribute_id: String,
    attribute: String,
    active: String
}));

exports.Discount = mongoose.model("Discount", new mongoose.Schema({
    discount_id: String,
    discount_name: String,
    discount_type: String,
    discount: String,
    discount_order_type: String,
    discount_applicable_on: String,
    discount_days: String,
    active: String,
    discount_on_total: String,
    discounts_starts: String,
    discount_ends: String,
    discount_time_from: String,
    discount_time_to: String,
    discount_min_amount: String,
    discount_max_amount: String,
    discount_has_coupon: String,
    discount_category_item_ids: String,
    discount_max_limit: String
}));

exports.Taxes = mongoose.model('Taxes', new mongoose.Schema({
    tax_id: String,
    tax_name: String,
    tax: String,
    tax_type: String,
    tax_ordertype: String,
    active: String,
    tax_core_or_total: String,
    tax_taxtype: String,
    rank: String,
    consider_in_core_amount: String,
    description: String,
}));
