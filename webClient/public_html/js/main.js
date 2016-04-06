$(document).ready(function() {
    /*
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/restful-java/user/all",        
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Basic " + btoa("admin:admin"));
        }       
    })
    .done(function(data) {        
        $(".panel-title").html("Users List");        
        var table = $('#users-list').DataTable({
            data: data,
            columns: [
                {
                    title: 'Id',
                    data: 'id'
                },
                {
                    title: 'Name',
                    data: 'name'
                },
                {
                    title: 'Email',
                    data: 'email'
                },
                {
                    title: 'Actions',
                    render: function () {
                        return '<button class="btn btn-primary btn-sm"><i class="fa fa-list-ul"></i> Detail</button>';
                    }
                }
            ]
        });
        
        $('#users-list tbody').on('click', 'button', function () {                        
            var selected = table.row($(this).parents('tr')).data();
            
            $('#details-modal-label').html('<b> ' + selected.username + '</b>\'s information');
            $('#details-id').attr('value', selected.id);
            $('#details-username').attr('value', selected.username);
            $('#details-password').attr('value', selected.password);
            $('#details-email').attr('value', selected.email);
            $('#details-name').attr('value', selected.name);                                
            $('#details-status').attr('value', selected.status);

            $('#details-modal').modal('show');            
        });
                        
    })
    .fail(function() {
        console.log("error");
    });*/
    
    $("#btnSubmit").click(function(){                
        
        var email = $("#email").val();
        var name = $("#name").val();
        var username = $("#username").val();
        var password = $("#password").val();
        
        var content = {address: "34 Thống Nhất, P11, Q.Gò Vấp, Tp.HCM",
  addressID: 1    ,
  description: "Xả rác",
  expectedTime: "2016-03-22T11:05:27+07:00",
  latitude: 109.09,
  longitude: 129.02,
  metadata: false,
  requestedTime: "2016-03-22T10:30:25+07:00",
  serviceCode: "10",
  serviceName: "Xả rác",
  statusID: 0,
  updatedTime: "2016-03-22T11:05:27+07:00"};
                
                console.log(JSON.stringify(content));
        $.ajax({
            method: "POST",
            url: "http://localhost:8080/restful-open311/request/add",
            data: JSON.stringify(content),
            contentType: "application/json;charset=UTF-8"
        })
        .done(function(data) {
            console.log("success");
        })
        .fail(function(msg) {
            console.log("error : " + msg);
        });
        
    });
    


});