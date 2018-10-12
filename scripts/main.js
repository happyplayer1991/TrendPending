(function ($) {

  var vehicle = {},
    $ele_vehicle_type = $('.vehicle-type'),
    $ele_vehicle_drivetrain = $('input[name=driveTrain]'),
    $ele_vehicle_enginesize = $('input[name=engineSize]'),
    $ele_vehicle_engineblock = $('input[name=engineBlock]'),
    $ele_vehicle_fueltype = $('input[name=fuelType]');

  // *** init select2 ***/
  $('.simple-select2').select2({
      ajax: {
          // url: "http://localhost/PHP/TrendPending/api/get_vehicle_list",
          url: 'api/get_vehicle_list',

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
            console.log(data);

            // *** format data to be used by select2 *** //
            var d = [];
            data.forEach(function(item) {
              d.push({
                id:    'id', 
                text:  item.year + " " + item.make + " " + item.model + " " + item.trim,
                year:  item.year,
                make:  item.make,
                model: item.model,
                trim:  item.trim
              });
            });
            
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
      placeholder: "Enter Year Make Model Trim",
      allowClear: true,
      escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
      minimumInputLength: 1,
      templateResult: format,
      templateSelection: formatSelection
  });

  
  $('.simple-select2').on("select2:select", function(e) {
    // *** init *** //

    var data = $(this).select2('data');
    var item = data[0];
    // year = '2018';
    // make = 'Ford';
    // model = 'Taurus';
    // // model = 'EcoSport';
    // trim = 'SE';
    // // trim = 'S';


    vehicle = {
      year: item.year,
      make: item.make,
      model: item.model,
      trim: item.trim
    };
    // *** Get drivetrain *** //
    
    var deferred = get_driveTrain();
    // $.when(deferred).done(function() {
    //     $('#reportModal').modal('show');
    //     console.log(vehicle);
    // });
  });

  $('body').on('click', '.drivetrain_list > button', function(e) {
    // show vehicle information
    show_vehicle_info($(this).text());
  });

  function formatSelection(data) {
    return data.text;
  }
  
  function format(data) {
      if (data.loading) 
        return data.text;
      return data.text;
  }

  function show_select_drivetrain(terms) {
    // show select drivetrain panel
    $('.select-drivetrain-panel').removeClass('display-hide');

    // init drivetrain lists
    $drivetrain_list = $('.drivetrain_list');
    $drivetrain_list.html('');

    // show drivetrains
    terms.forEach(function(term) {
      element = btn_drivetrain(term);
      $(element).appendTo($drivetrain_list);
    });
    // set year + make + model + trim
    set_vehicle_type(get_ymmt(vehicle));
  }

  function show_vehicle_info(drivetrain) {

    $('.vehicle-info').removeClass('display-hide');
    $('.select-drivetrain-panel').addClass('display-hide');

    // set drivetrain of vehicle
    set_drive_train(drivetrain)

    // get body_type data
    var deferred, deferred_1, deferred_2;
    deferred = get_bodyType();
    $.when(deferred).done(function() {
        deferred_1 = get_engineSize();
        $.when(deferred_1).done(function() {
          deferred_2 = get_engineBlock();
          $.when(deferred_2).done(function() {
            deferred_2 = get_fuelType();
          });
        });
    });
  }

  function btn_drivetrain(drivetrain) {
    button_temp = "<button type='button' class='btn btn-outline-danger btn-block'>" +
                  drivetrain +
                  "</button>";
    return button_temp;
  }

  function get_ymmt(vehicle) {
    // year + make + model + trim
    var fields = ['year', 'make', 'model', 'trim']
    var type_array = datafromVehicle(vehicle, fields);
    return type_array.join(" ");
  }

  function get_ymmtb(vehicle) {
    // year + make + model + trim + drivetrain
    return get_ymmt(vehicle) + " " + vehicle.body_type;
  }

  function datafromVehicle(vehicle, fields) {
    var data = [];
    fields.forEach(function(field) {
      data.push(vehicle[field]);
    });
    return data;
  }

  function get_driveTrain() {
    
    return $.get('api/get_report', {field: 'drivetrain', vehicle: JSON.stringify(vehicle)}, function(data, status) {
      terms = data.terms;
      // *** show show_select_drivetrain part *** //
      if(terms.length > 1) {
        show_select_drivetrain(terms);
      }
      else if(terms.length == 1) {
        show_vehicle_info(terms[0]);
      } else {
        set_vehicle_type('No vehicle found');
      }
      
    }, 'json');

  }

  function get_bodyType() {
    return $.get('api/get_report', {field: 'body_type', vehicle: JSON.stringify(vehicle)}, function(data, status) {
      terms = data.terms;
      console.log(terms);

      if(terms.length > 1) {
        
      }
      else if(terms.length == 1) {
        vehicle.body_type = terms[0];
        // set year + make + model + trim + drivetrain
        set_vehicle_type(get_ymmtb(vehicle));
      } else {
        set_vehicle_type('No Car Found');
      }
    }, 'json');
  }

  function get_engineSize() {
    return $.get('api/get_report', {field: 'engine_size', vehicle: JSON.stringify(vehicle)}, function(data, status) {
      terms = data.terms;
      console.log(terms);

      if(terms.length > 1) {
        
      }
      else if(terms.length == 1) {
        set_engine_size(terms[0]);
      } else {
      }
    }, 'json');
  }

  function get_engineBlock() {
    return $.get('api/get_report', {field: 'engine_block', vehicle: JSON.stringify(vehicle)}, function(data, status) {
      terms = data.terms;
      console.log(terms);

      if(terms.length > 1) {
       
      }
      else if(terms.length == 1) {
        set_engine_block(terms[0]);
      } else {
      }
    }, 'json');
  }

  function get_fuelType() {
    return $.get('api/get_report', {field: 'fuel_type', vehicle: JSON.stringify(vehicle)}, function(data, status) {
      terms = data.terms;
      console.log(terms);

      if(terms.length > 1) {
        
      }
      else if(terms.length == 1) {
        set_fuel_type(terms[0]);
        $('#reportModal').modal('show');
      } else {
      }
    }, 'json');
  }

  function set_vehicle_type(type) {
    $ele_vehicle_type.text(type);
  }

  function set_drive_train(drivetrain) {
    vehicle.drive_train = drivetrain;
    $ele_vehicle_drivetrain.val(drivetrain);
  }
  
  function set_engine_size(enginesize) {
    vehicle.engine_size = enginesize;
    $ele_vehicle_enginesize.val(enginesize);
  }

  function set_engine_block(engineblock) {
    vehicle.engine_block = engineblock;
    $ele_vehicle_engineblock.val(engineblock);
  }

  function set_fuel_type(fueltype) {
    vehicle.fuel_type = fueltype;
    $ele_vehicle_fueltype.val(fueltype);
  }

})(jQuery);


