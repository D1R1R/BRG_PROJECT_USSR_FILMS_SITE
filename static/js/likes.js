function check_l(id) {
    let input = document.getElementById("like" + id);
    let user_id = document.URL.match(/\d+/g).reverse()[1];
    let film_id = document.URL.match(/\d+/g).reverse()[0];


    $.post( "/postmethod", {
        product_data: film_id,
        user_data: user_id
    });
}