(function ($) {

    var car_data = {};

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
      // *** init *** //
      car_data = {}; 
      // console.log('selected');
      var data = $(this).select2('data'),
          text = data[0].text;

      year = '2018';
      make = 'Ford';
      // model = 'Taurus';
      model = 'EcoSport';
      // trim = 'SE';
      trim = 'S';

      // *** Get drivetrain *** //
      var deferred = get_field_data('drivetrain');
      $.when(deferred).done(function() {

          vehicle_type  = year + " ";
          vehicle_type += make + " ";
          vehicle_type += model + " ";
          vehicle_type += trim + " ";
          // vehicle_type += car_data.drivetrain;

          $('#reportModal').modal('show');
          $('.vehicle-type').html(vehicle_type);

          $('.vehicle-details')
      });
    });

    function formatRepoSelection(data) {
      return data.text;
    }
    
    function formatRepo(data) {
        if (data.loading) return data.text;
    
        return data.text;
    }

    function get_field_data(field) {
      
      return $.get('api/get_report', {field: field}, function(data, status) {
        terms = data.terms;

        // *** show show_select_drivetrain part *** //
        if(terms.length > 1) {
          show_select_drivetrain(terms);
        
        }
        console.log(terms);
        // car_data[field] = terms;
      }, 'json');

    };

    function show_select_drivetrain(terms) {
      $drivetrain_panel = $('.select-drivetrain-panel');
      $drivetrain_panel.removeClass('display-hide');

      $drivetrain_panel.html('');
      terms.forEach(function(term) {
        element = btn_drivetrain(term);
        $(element).appendTo('.select-drivetrain-panel');
      });
    }

    function btn_drivetrain(drivetrain) {

      button_temp = "<button type='button' class='btn btn-outline-danger btn-block'>" +
                    drivetrain +
                    "</button>";
      return button_temp;
    }
})(jQuery);


