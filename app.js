
var App = angular.module('App', []);
App.controller('mainController', function($scope,$timeout,$location,$window) {
          
            $scope.Total_hours=60;
            localStorage.Total_hours=$scope.Total_hours;
            $scope.days=Math.floor($scope.Total_hours/24);
            $scope.hours= $scope.Total_hours%24;
            console.log($scope.days+'day,'+$scope.hours+'hrs');
                localStorage.showhours=$scope.hours;
                localStorage.showdays=$scope.days;
          $scope.additionalNumbers=[];
          $scope.showhours=localStorage.showhours;
          $scope.showdays=localStorage.showdays;
          $scope.Total_hours=localStorage.Total_hours;

          
           $scope.hideAddButton=function(i)
           {
            i.hide_unhide_AddButton=true;
            console.log("i="+i);
           };
           $scope.showAddButton=function(i){
            $scope.FlashCartRemoved=true;
                $timeout(function () {
                    $scope.FlashCartRemoved = false;    
                },3000);
            console.log("i="+i);
            
            i.hide_unhide_AddButton=false;
           };
           
           
            
           
           
           $scope.callFunction=function(name){
                $scope.removedBike=name;
                $scope.FlashCartRemoved=true;
                $timeout(function () {
                    $scope.FlashCartRemoved = false;    
                },3000);
                var i;
            for(i=0; i<$scope.bikes.items.length ;i++){
                  if($scope.bikes.items[i].bike_name==name)
                    {
                        console.log("value = "+$scope.bikes.items[i].bike_name);
                        var id;
                        id=$scope.bikes.items[i];
                        console.log("id="+id);
                        id.hide_unhide_AddButton=false;
                        localStorage.button_false=false;
                        
                    }  
            }
              
           };
            

          $scope.callCartDelete=function(bike_name){
                for(i=0; i<$scope.storeArray.length ;i++){
                  if($scope.storeArray[i].bike==bike_name){

                        $scope.storeArray.splice(i,1);
                        $scope.totalCost();
                  }
                }
                if($scope.storeArray.length===0)
                  {
                    $window.location.href='#/vehiclerent';
                  }
          };
          

     $scope.bikes = {
        items: [
           {
            id: 0,
            location : ['VNIT','Madhav Nagar','Buldi','Sadar'],
            bike_name : 'PULSAR',
            deposit : 2000,
            rate: 20,
            available :5
            },

            {
                id: 1,
            location : ['Trimurti Nagar','Buldi','Sadar','Bajaj Nagar','VNIT'],
            bike_name : 'SPLENDAR',
            deposit : 1000,
            rate: 10,
            available :3
            },
            
            {
                id: 2,
            location : ['Narendranagar','VNIT','Buldi','Trimurti Nagar'],
            bike_name : 'SUZUKI FZ',
            deposit : 1000,
            rate: 25,
            available :2
            },

            {
                id: 3,
            location : ['VNIT','Narendranagar','Sadar','Buldi'],
            bike_name : 'CBZ',
            deposit : 2000,
            rate: 15,
            available :8
            }

        ]
    };


    
    /*$scope.storeArray=[{bike:'',cost:'',bike_counter:''}];*/

    $scope.bike_counter=0;
    $scope.rent_per_bike=0;


    /*for(var i=0; i<$scope.bikes.items.length ; i++)
        {  */ 
          $scope.saved = localStorage.getItem('storeArray');
          $scope.storeArray = (localStorage.getItem('storeArray')!==null) ? JSON.parse($scope.saved) : [];
          localStorage.setItem('storeArray', JSON.stringify($scope.storeArray));

           $scope.hide_cart_button=false;


           $scope.addvalue=function(bike,rate_per_bike,available,PickUpLocation)
           {     
            $scope.FlashAddedtoCart=true;
            $timeout(function () {

                $scope.FlashAddedtoCart = false;
                
            },3000);
              
                 $scope.hide_cart_button=true;
                 $scope.bike=bike;
                 $scope.bike_counter=1;
                 $scope.rate_per_bike = rate_per_bike;
                 $scope.available=available;
                 $scope.cost= $scope.bike_counter * $scope.rate_per_bike;
                 $scope.PickUpLocation=PickUpLocation;
                 /*$scope.CartIndex=index;*/
                 
                 if($scope.storeArray.length===0)
                    {
                       $scope.storeArray.push(
                            {
                                bike:$scope.bike,
                                cost:$scope.cost,
                                bike_counter:$scope.bike_counter,
                                rate_per_bike:$scope.rate_per_bike,
                                available:$scope.available,
                                PickUpLocation:$scope.PickUpLocation
                            }
                          );
                       localStorage.setItem('storeArray', JSON.stringify($scope.storeArray));
                       /*var retrievedData = localStorage.getItem("storeArray");
                       var storeArray = JSON.parse(retrievedData);
                       $scope.storeArray=storeArray;*/
                       console.log("bike name ="+$scope.storeArray[0].bike);
                    }
                 else if($scope.storeArray.length!==0){
                           $scope.flag=0;
                        for(var i=0; i<$scope.storeArray.length; i++)
                        {
                            if($scope.storeArray[i].bike==bike)
                            {
                              $scope.flag=1;   
                            }  
                            
                        }
                        if($scope.flag==1)
                            {console.log("Already in the cart");}
                             
                            else if($scope.flag===0){
                              $scope.storeArray.push(
                                {
                                    bike:$scope.bike,
                                    cost:$scope.cost,
                                    bike_counter:$scope.bike_counter,
                                    rate_per_bike:$scope.rate_per_bike,
                                    available:$scope.available,
                                    PickUpLocation:$scope.PickUpLocation
                                }
                                   ); 
                              localStorage.setItem('storeArray', JSON.stringify($scope.storeArray));
                              
                            }
                 }
              $scope.deleteArray = function(index){
              $scope.storeArray.splice(index,1);
                $scope.totalCost();
                /*console.log("hi"+$scope.storeArray[index].bike);*/
       
               }
                $scope.totalCost();

           }
                $scope.IncrementUpdateElement = function(item) {
                        for(var i = 0; i < $scope.storeArray.length; i++) {
                               if($scope.storeArray[i].bike === item) {
                                 $scope.index=i;
                                 $scope.bike_counter=$scope.storeArray[i].bike_counter;
                                 $scope.cost=$scope.storeArray[i].cost;
                                 $scope.rate_per_bike=$scope.storeArray[i].rate_per_bike;
                                 $scope.available=$scope.storeArray[i].available;
                               }
                               
                            }

                            if($scope.available!=1)
                            {
                                $scope.bike_counter++;
                                $scope.available--;     
                            }
                           
                          $scope.cost= $scope.bike_counter * $scope.rate_per_bike;

                         if($scope.index > -1){
                              $scope.storeArray[$scope.index].cost = $scope.cost;
                              $scope.storeArray[$scope.index].bike_counter = $scope.bike_counter;
                              $scope.storeArray[$scope.index].rate_per_bike = $scope.rate_per_bike;
                              $scope.storeArray[$scope.index].available = $scope.available;
                        
                               // will update item 
                             }   
                             localStorage.setItem('storeArray', JSON.stringify($scope.storeArray));
                              $scope.totalCost();
                      };
                $scope.DecrementUpdateElement = function(item) {
                        for(var i = 0; i < $scope.storeArray.length; i++) {
                               if($scope.storeArray[i].bike === item) {
                                 $scope.index=i;
                                 $scope.bike_counter=$scope.storeArray[i].bike_counter;
                                 $scope.cost=$scope.storeArray[i].cost;
                                 $scope.rate_per_bike=$scope.storeArray[i].rate_per_bike;
                                 $scope.available=$scope.storeArray[i].available;  
                               }
                            }
                            if($scope.bike_counter!=1)
                            {
                                $scope.bike_counter--;
                                $scope.available++;     
                            }
                           $scope.cost= $scope.bike_counter * $scope.rate_per_bike;

                         if($scope.index > -1){
                              $scope.storeArray[$scope.index].cost = $scope.cost;
                              $scope.storeArray[$scope.index].bike_counter = $scope.bike_counter;
                              $scope.storeArray[$scope.index].rate_per_bike = $scope.rate_per_bike;
                              $scope.storeArray[$scope.index].available = $scope.available;
                               // will update item 
                             }   
                             localStorage.setItem('storeArray', JSON.stringify($scope.storeArray));
                              $scope.totalCost();
                      };

                      $scope.totalCost=function()
                        {
                            $scope.TotalCost=0;
                            $scope.finalCost=0;
                            
                            for(var i = 0; i < $scope.storeArray.length; i++) {
                               $scope.TotalCost = $scope.TotalCost + $scope.storeArray[i].cost; 
                               console.log($scope.storeArray[i].cost);
                            }

                            localStorage.TotalCost=$scope.TotalCost;
                            localStorage.setItem('storeArray', JSON.stringify($scope.storeArray));
                            
                        };

                            $scope.TotalCost=localStorage.TotalCost;
                            
                             
           $scope.CheckAddRemoveButtonStatus=function()
           {
                
                  for(j=0;j<$scope.storeArray.length;j++)
                  {
                    for(i=0; i<$scope.bikes.items.length ;i++)
                     {

                    if($scope.bikes.items[i].bike_name==$scope.storeArray[j].bike)
                        { 
                        var id;
                        id=$scope.bikes.items[i];   
                        id.hide_unhide_AddButton=true;
                       }  
                  }
                } 
           };          
                  
                    $scope.CheckAddRemoveButtonStatus();
});
