(function ($) {
    $('.simple-select2').select2({
        ajax: {
            // url: "http://localhost/PHP/TrendPending/api/get_ymmt_list",
            url: 'api/get_ymmt_list',

            dataType: 'json',
            delay: 250,
          
            // *** Fix CORS issue *** //
            headers : {
              'Access-Control-Allow-Origin' : '*'
            },

            data: function (params) {
              return {
                q: params.term, // search term
                page: params.page
              };
            },

            processResults: function (data, params) {

              // *** get data from response *** //
              items = data.terms;
              
              // *** format data to be used by select2 *** //
              var d = [];

              for (var i = 0; i < items.length; i++) {
                d.push({
                  id: items[i], 
                  text: items[i]
                });
              } 
              console.log(d);

              params.page = params.page || 1;
        
              return {
                results: d,
                pagination: {
                  more: (params.page * 30) < data.total_count
                }
              };
            },
            cache: true
        },
        
        theme: 'bootstrap4',
        placeholder: "Select your car",
        allowClear: true,
        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
        minimumInputLength: 1,
        templateResult: formatRepo,
        templateSelection: formatRepoSelection
    });

    $('.simple-select2').on("select2:select", function(e) { 
      // console.log('selected');
      var data = $(this).select2('data'),
          text = data[0].text;
      // console.log(text);

      $.ajax({
        type: 'POST',
        url: 'api/get_report',
        
        dataType: 'json',
        
        // *** Fix CORS issue *** //
        headers : {
          'Access-Control-Allow-Origin' : '*'
        },
        data: {

        },
        success: function(suc, res) {
          console.log(suc);
        }
      });
    });

    function formatRepoSelection(data) {
      return data.text;
    }
    
    function formatRepo(data) {
        if (data.loading) return data.text;
    
        return data.text;
    }

})(jQuery);


