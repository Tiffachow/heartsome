String.prototype.toSlug = function(){
    str = this.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
      
    // remove accents, swap ñ for n, etc
    var from = "ãàáäâèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeiiiiooooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
 
    str = str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
 
    return str;
};

// https://gist.github.com/igor822/8795879