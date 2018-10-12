<!DOCTYPE html>
<html>
<head>
    <title>Trend Pending</title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!---------  Plugins --------->
    <link rel="stylesheet" type="text/css" href="./assets/plugins/bootstrap/4.1.3/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="./assets/plugins/select2/4.0.6-rc.1/css/select2.min.css" />
    <link rel="stylesheet" href="./node_modules/select2-bootstrap4-theme/dist/select2-bootstrap4.css">

    <!---------  Custom CSS --------->
    <link rel="stylesheet" type="text/css" media="screen" href="./assets/css/main.css" />
    

</head>
<body>
    <header>
        <div class="container">
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand" href="#">
                    <img src="https://www.crestviewchrysler.ca/wp-content/themes/DealerInspireDealerTheme/images/logo.png">
                </a>
            </nav>
        </div>
    </header>

    <main class="container">

        <div id="car_carousel" class="carousel slide" data-ride="carousel">
            <ul class="carousel-indicators">
                <li data-target="#car_carousel" data-slide-to="0" class="active"></li>
                <li data-target="#car_carousel" data-slide-to="1"></li>
                <li data-target="#car_carousel" data-slide-to="2"></li>
            </ul>
            
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="https://be174d9c0d369938aec5-d6573c2d7615a27c0364e95a9ff111cb.ssl.cf1.rackcdn.com/WAUFFAFC4JN038851/4a15e6348591f2ae5c893e0cf2458e4e.jpg" alt="Los Angeles" width="1100" height="500">
                </div>
                <div class="carousel-item">
                    <img src="https://be174d9c0d369938aec5-d6573c2d7615a27c0364e95a9ff111cb.ssl.cf1.rackcdn.com/WAUFFAFC4JN038851/615847db49b63de531ffae88643ebe3e.jpg" alt="Chicago" width="1100" height="500">
                </div>
                <div class="carousel-item">
                    <img src="https://be174d9c0d369938aec5-d6573c2d7615a27c0364e95a9ff111cb.ssl.cf1.rackcdn.com/WAUFFAFC4JN038851/4585b93c4b605732a89ddf91021254bd.jpg" alt="New York" width="1100" height="500">
                </div>
            </div>
            
            <a class="carousel-control-prev" href="#car_carousel" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#car_carousel" data-slide="next">
                <span class="carousel-control-next-icon"></span>
            </a>
        </div>

        <div class="tradepending-panel my-3 p-2 bg-success">
            <div class="row">
                <div class="col-sm-12 col-md-3 text-center">
                    <h3 class="text-white">Value Your Trade</h3>
                </div>
                <div class="col-sm-12 col-md-6">
                    <select class="simple-select2 w-100">
                    </select>
                </div>

                <div class="col-sm-12 col-md-3 text-center">
                    <div class="tradepending-poweredby-container h-100">
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="reportModal" tabindex="-1" role="dialog" aria-labelledby="reportModalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title vehicle-type"></h2>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="select-drivetrain-panel display-hide">
                                <h3 class="text-center">Select Drive Train of the Vehicle</h3>
                                <div class="drivetrain_list">
                                </div>
                        </div>
                        <div class="vehicle-info display-hide">
                            <div class="form-group row">
                                <label for="drivetrain" class="col-sm-2 text-primary">Drive Train:</label>
                                <div class="col-sm-10">
                                    <input type="text" readonly class="form-control-plaintext text-danger" name="driveTrain" value="">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="engineSize" class="col-sm-2 text-primary">Engine Size:</label>
                                <div class="col-sm-10">
                                    <input type="text" readonly class="form-control-plaintext text-danger" name="engineSize" value="">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="engineBlock" class="col-sm-2 text-primary">Engine Block:</label>
                                <div class="col-sm-10">
                                    <input type="text" readonly class="form-control-plaintext text-danger" name="engineBlock" value="">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="fuelType" class="col-sm-2 text-primary">Fuel Type:</label>
                                <div class="col-sm-10">
                                    <input type="text" readonly class="form-control-plaintext text-danger" name="fuelType" value="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Okay</button>
                    </div>
                    -->
                </div>
            </div>
        </div>

    </main>

    <!---------  Plugins --------->
    <!-- <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script> -->
    <script src="./assets/plugins/jquery/3.3.1/jquery.min.js"></script>
    <script src="./assets/plugins/popper.js/1.14.3/umd/popper.min.js"></script>
    <script src="./assets/plugins/bootstrap/4.1.3/bootstrap.min.js"></script>
    <script src="./assets/plugins/select2/4.0.6-rc.1/js/select2.full.min.js"></script>

    <!---------  Custom JS --------->
    <script src="./scripts/main.js"></script>

</body>
</html>