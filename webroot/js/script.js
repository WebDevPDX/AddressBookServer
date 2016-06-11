//TODO: rewrite the ng-class to fix build error messages

var app = angular.module('AddressBookApp', []);
//var requestURL;

app.controller('addressBook', function($scope, $http) {
    $scope.nameList;
    $scope.formShown = false;
    $scope.editMode = false;
    $scope.deleteModalShown = false;
    $scope.contactIDNumber;
    $scope.personDetail;
    $scope.personPhone;
    $scope.personAddress;
    $scope.phoneTypeOptions;
    $scope.addressTypeOptions;
    $scope.editDataObject = {};
    $scope.editDataObject.contact;
    $scope.editDataObject.phones = [];
    $scope.editDataObject.addresses;
    $scope.editPhoneDeleted = [];
    $scope.editAddressDeleted = [];
    $scope.editPhoneAdded= [];
    $scope.editAddressAdded = [];

    function makeNewContactDetail() {
        $scope.contact = {
            "givenName" : "",
            "surname" : ""
        };
        $scope.phones = [];
        $scope.addresses = [];
    }

    //NG-CLASS CHECKS
    $scope.isCurrentContact = function(ID) {
        if (ID === $scope.personDetail.contactID) {
            return "active";
        } else {
            return "";
        }
    }
    $scope.checkNoName = function(givenName, surname) {
        //console.log(givenName + ' ' + surname);
        if (givenName === 'No' && surname === 'Name') {
            return "italicized";
        } else {
            return "";
        }
    }

    //ALL $HTTP REQUESTS
    function getAllContacts(callback) {
        $http({
            method : "GET",
            url : "/contacts"
        }).then(function mySucces(response) {
            if(callback) callback(response);
        }, function myError(response) {
            $scope.errorLog = response.statusText;
        });
    }
    function getPhoneTypeOptions(callback) {
        $http({
            method : "GET",
            url : "/address-types"
        }).then(function mySucces(response) {
            if(callback) callback(response);
        }, function myError(response) {
            $scope.errorLog = response.statusText;
        }); 
    }
    function getAdrdressTypeOptions(callback) {
        $http({
            method : "GET",
            url : "/phone-types"
        }).then(function mySucces(response) {
            if(callback) callback(response);
        }, function myError(response) {
            $scope.errorLog = response.statusText;
        });  
    }
    function getContactDetail(ID, callback) {
        $http({
            method : "GET",
            url : "/contacts/" + ID
        }).then(function mySucces(response) {
            if(callback) callback(response);
        }, function myError(response) {
            $scope.errorLog = response.statusText;
        });
    }
    function getAllAddressesForContact(ID, callback) {
        $http({
            method : "GET",
            url : "/contacts/" + ID + "/addresses"
        }).then(function mySucces(response) {
            if(callback) callback(response);
        }, function myError(response) {
            $scope.errorLog = response.statusText;
        });
    }
    function getAllPhonesForContact(ID, callback) {
        $http({
            method : "GET",
            url : "/contacts/" + ID + "/phones"
        }).then(function mySucces(response) {
            if(callback) callback(response);
        }, function myError(response) {
            $scope.errorLog = response.statusText;
        });
    }
    function saveNewContact(contact, callback) {
        $http({
            method : "POST",
            url : "/contacts",
            headers: {
                'Content-Type': "JSON"
            },
            data: contact
        }).then(function mySucces(response) {
            if(callback) callback(response);
        }, function myError(response) {
            $scope.errorLog = response.statusText;
        });
    }
    function saveNewPhoneForContact(ID, phone, callback) {
        if(phone.phoneNumber === "") return;
        $http({
            method : "POST",
            url : "/contacts/" + ID + "/phones",
            headers: {
                'Content-Type': "JSON"
            },
            data: phone
        }).then(function mySucces(response) {
            if(callback) callback(response);
        }), function myError(response) {
            $scope.errorLog = response.statusText;
        }; 
    }
    function saveNewAddressForContact(ID, address, callback) {
        if(address.street === "" && address.state === "" && address.city === "") return;
        $http({
            method : "POST",
            url : "/contacts/" + ID + "/addresses",
            headers: {
                'Content-Type': "JSON"
            },
            data: address
        }).then(function mySucces(response) {
            if(callback) callback(response);
        }), function myError(response) {
            $scope.errorLog = response.statusText;
        };
    }
    function updateExistingContact(ID, contact, callback) {
        $http({
            method : "PUT",
            url : "/contacts/" + ID,
            headers: {
                'Content-Type': "JSON"
            },
            data: contact
        }).then(function mySucces(response) {
            if(callback) callback(response);
        }, function myError(response) {
            $scope.errorLog = response.statusText;
        });
    }
    function updateExistingPhone(ID, phoneID, phone, callback){
        $http({
            method : "PUT",
            url : "/contacts/" + ID + "/phones/" + phoneID,
            headers: {
                'Content-Type': "JSON"
            },
            data: phone
        }).then(function mySucces(response) {
            if(callback) callback(response);
        }, function myError(response) {
            $scope.errorLog = response.statusText;
        });
    }
    function updateExistingAddress(ID, addressID, address, callback){
        $http({
            method : "PUT",
            url : "/contacts/" + ID + "/addresses/" + addressID,
            headers: {
                'Content-Type': "JSON"
            },
            data: address
        }).then(function mySucces(response) {
            if(callback) callback(response);
        }, function myError(response) {
            $scope.errorLog = response.statusText;
        });
    }
    function deleteExistingContact (ID, callback) {
        $http({
            method : "DELETE",
            url : "/contacts/" + ID
        }).then(function mySucces(response) {
            if(callback) callback(response);
        }, function myError(response) {
            $scope.errorLog = response.statusText;
        });
    }
    function deleteExistingPhone(ID, phoneID, callback) {
        $http({
            method : "DELETE",
            url : "/contacts/" + ID + "/phones/" + phoneID
        }).then(function mySucces(response) {
            if(callback) callback(response);
        }, function myError(response) {
            $scope.errorLog = response.statusText;
        });
    }
    function deleteExistingAddress(ID, addressID, callback) {
        $http({
            method : "DELETE",
            url : "/contacts/" + ID + "/addresses/" + addressID
        }).then(function mySucces(response) {
            if(callback) callback(response);
        }, function myError(response) {
            $scope.errorLog = response.statusText;
        });
    }

    //GET THE OPTIONS LISTS - COMMENTED OUT AS THESE ARE NOT ACTIVELY USED AT THE MOMENT
    // getPhoneTypeOptions(function(response) {
    //     $scope.phoneTypeOptions = response.data;
    //     console.log($scope.phoneTypeOptions);
    // });
    // getAdrdressTypeOptions(function(response) {
    //     $scope.addressTypeOptions = response.data;
    //     console.log($scope.addressTypeOptions);
    // });

    //GET THE LIST OF CONTACTS (LEFT SIDE)
    getAllContacts(function(response) {
        $scope.nameList = response.data;
        $scope.getDetails($scope.nameList[0].contactID);
    });

    //GET THE DETAILS OVERVIEW (RIGHT SIDE)
    $scope.getDetails = function(ID) {
            // $scope.personDetail = {};
            // $scope.personPhone = [];
            // $scope.personAddress = [];

        $scope.contactIDNumber = ID;

        getContactDetail(ID, function(response) {
            $scope.personDetail = response.data;
        });

        getAllPhonesForContact(ID, function(response) {
            $scope.personPhone = response.data;
        });

        getAllAddressesForContact(ID, function(response) {
            $scope.personAddress = response.data;
        });
    }

    //CREATE NEW CONTACT
    $scope.addPhoneNewContact = function() {
        var emptyPhone = {"phoneType" : "Home Phone", "phoneNumber" : ""}
        $scope.phones.push(emptyPhone);
    }

    $scope.addAddressNewContact = function() {
        var emptyAddress = {"addressType" : "Home Address", "street" : "", "city" : "", "state" : "", "postalCode" : ""}
        $scope.addresses.push(emptyAddress);
    }
    $scope.removePhoneNewContact = function(index) {
        $scope.phones.splice(index, 1);
    }
    $scope.removeAddressNewContact = function(index) {
        $scope.addresses.splice(index, 1);
    }
    $scope.submitNewContact = function() {
        //IF THE NAME IS EMPTY SET IT TO NO NAME
        if ($scope.contact.givenName === "" && $scope.contact.surname === "") {
            $scope.contact.givenName = "No";
            $scope.contact.surname = "Name";
        }

        saveNewContact($scope.contact, function(response) {
            var ID = response.data.contactID;
            var phones = $scope.phones.slice();
            var addresses = $scope.addresses.slice();
            // TODO:krb check if phones and addresses are valid before sending
            for(var i=0; i<phones.length; i++) {
                saveNewPhoneForContact(ID, phones[i]);
            }
            for(var j=0; j<addresses.length; j++) {
                saveNewAddressForContact(ID, addresses[j]);
            }
            //SHOW THE ADDED CONTACT

            getAllContacts(function(response) {
                $scope.nameList = response.data;
                $scope.getDetails(ID);
            });

            $scope.formShown = false;
        });
    }

    //EDIT ENTRY
    $scope.addEditPhone = function() {
        var emptyPhone = {"phoneType" : "Home Phone", "phoneNumber" : ""}
        $scope.editDataObject.phones.push(emptyPhone);
    }
    $scope.addEditAddress = function() {
        var emptyAddress = {"addressType" : "Home Address", "street" : "", "city" : "", "state" : "", "postalCode" : ""}
        $scope.editDataObject.addresses.push(emptyAddress);
    }
    $scope.removeEditPhone = function(index) {
        $scope.editPhoneDeleted.push($scope.editDataObject.phones.splice(index, 1));
        $scope.personPhone.splice(index, 1);
    }
    $scope.removeEditAddress = function(index) {
        $scope.editAddressDeleted.push($scope.editDataObject.addresses.splice(index, 1));
        $scope.personAddress.splice(index, 1);
    }
    function makeEditObject() {
        //EMPTY ALL OBJECTS AND ARRAYS
        $scope.editDataObject.contact = {};
        $scope.editDataObject.phones = [];
        $scope.editDataObject.addresses = [];
        $scope.phoneDeleted = [];
        $scope.addressDeleted = [];
        //CREATE COMPARISON COPY OF THE PHONE AND ADDRESS ARRAYS
        $scope.editDataObject.contact = Object.assign({}, $scope.personDetail);
        for (var a = 0; a < $scope.personPhone.length; a++) {
            $scope.editDataObject.phones.push(Object.assign({}, $scope.personPhone[a]));
        }
        for (var b = 0; b < $scope.personAddress.length; b++) {
            $scope.editDataObject.addresses.push(Object.assign({}, $scope.personAddress[b]));
        }
    }
    $scope.submitEntryUpdate = function() {
        var ID = $scope.editDataObject.contact.contactID;

        //IF THE NAME IS EMPTY SET IT TO NO NAME
        if ($scope.editDataObject.contact.givenName === "" && $scope.editDataObject.contact.surname === "") {
            $scope.editDataObject.contact.givenName = "No";
            $scope.editDataObject.contact.surname = "Name";
        }
        //IF THE DETAILS DONT MATCH, UPDATE THE CONTACT THEN GET A FRESH PULL FROM THE SERVER
        if (!_.isEqual($scope.editDataObject.contact, $scope.personDetail)) {
            updateExistingContact(ID, $scope.editDataObject.contact, function(){
                $scope.getDetails(ID);
            });
        }
        //DELETE PHONES THAT WERE DELETED IN THE DATA-ARRAYS (PAGE VIEW) FROM SERVER
        if ($scope.editPhoneDeleted.length > 0) {
            for (var k = 0; k < $scope.editPhoneDeleted.length; k++) {
                deleteExistingPhone(ID, $scope.editPhoneDeleted[k][0].phoneID, function(){
                    $scope.getDetails(ID);
                });
            }
        } 
        //POST NEWLY ADDED PHONES TO THE SERVER
        for (var o = 0; o < $scope.editDataObject.phones.length; o++) {
            if (!('phoneID' in $scope.editDataObject.phones[o])) {
                saveNewPhoneForContact(ID, $scope.editDataObject.phones[o], function(){
                    $scope.getDetails(ID);
                }); 
                $scope.editDataObject.phones.splice(o, 1);
            }   
        }
        //RUN THROUGH ARRAY OF PHONE NUMBER OBJECTS, COMPARE TO NON-MUTATED OBJECTS AND IF !== UPDATE SERVER DATA
        for (var i = 0; i < $scope.editDataObject.phones.length; i++) {
            if (!_.isEqual($scope.editDataObject.phones[i], $scope.personPhone[i])) {
                updateExistingPhone(ID, $scope.editDataObject.phones[i].phoneID, $scope.editDataObject.phones[i], function(){
                    $scope.getDetails(ID);
                });
            }
        }
        //DELETE ADDRESSES THAT WERE DELETED IN THE DATA-ARRAYS (PAGE VIEW) FROM SERVER
        if ($scope.editAddressDeleted.length > 0) {
            for (var m = 0; m < $scope.editAddressDeleted.length; m++) {
                deleteExistingAddress(ID, $scope.editAddressDeleted[m][0].addressID, function(){
                    $scope.getDetails(ID);
                });
            }
        }
        //POST NEWLY ADDED ADDRESSSES TO THE SERVER
        for (var p = 0; p < $scope.editDataObject.addresses.length; p++) {
            if (!('addressID' in $scope.editDataObject.addresses[p])) {
                saveNewAddressForContact(ID, $scope.editDataObject.addresses[p], function(){
                    $scope.getDetails(ID);
                }); 
                $scope.editDataObject.addresses.splice(p, 1);
            }   
        }
        //RUN THROUGH ARRAY OF ADDRESS OBJECTS, COMPARE TO NON-MUTATED OBJECTS AND IF !== UPDATE SERVER DATA
        for (var j = 0; j < $scope.editDataObject.addresses.length; j++) {
            if (!_.isEqual($scope.editDataObject.addresses[j], $scope.personPhone[j])) {
                updateExistingAddress(ID, $scope.editDataObject.addresses[j].addressID, $scope.editDataObject.addresses[j], function(){
                    $scope.getDetails(ID);
                });
            }
        }
        //TURN EDIT MODE OFF
        $scope.editMode = false;
    }

    //SWITCH VIEWS
    $scope.showForm = function() {
        if ($scope.editMode) {
            $scope.submitEntryUpdate();
            //UPDATE LIST OF CONTACTS TO REFLECT POSSIBLE NAME CHANGES 
            getAllContacts(function(response) {
                $scope.nameList = response.data;
            });
        }
        makeNewContactDetail();
        $scope.formShown = true;
    }
    $scope.hideForm = function() {
        $scope.formShown = false;
    }
    $scope.editModeOn = function() {
        makeEditObject();
        $scope.editMode = true;
    }
    $scope.editModeOff = function() {
        $scope.editMode = false;
        submitEntryUpdate();
    }
    $scope.deleteModalShow = function() {
        $scope.deleteModalShown = true;
    }
    $scope.deleteModalHide = function() {
        $scope.deleteModalShown = false;
    }
    
    // DELETE ENTRY
    $scope.deleteDetails = function() {
        var ID = $scope.editDataObject.contact.contactID;

        //IF ENTRY HAS PHONE NUMBERS, DELETE ALL PHONE NUMBERS FROM SERVER
        if ($scope.editPhoneDeleted.length > 0) {
            for (var k = 0; k < $scope.editPhoneDeleted.length; k++) {
                deleteExistingPhone(ID, $scope.editPhoneDeleted[k][0].phoneID);
            }
        }
        //IF ENTRY HAS ADDRESSES, DELETE ALL ADDRESSES FROM SERVER
        if ($scope.editAddressDeleted.length > 0) {
            for (var m = 0; m < $scope.editAddressDeleted.length; m++) {
                deleteExistingAddress(ID, $scope.editAddressDeleted[m][0].addressID);
            }
        }
        //DELETE CONTACT FROM SERVER
        deleteExistingContact (ID, function(response) {
            // UPDATE THE NAMELIST
            getAllContacts(function(response) {
                $scope.nameList = response.data;
            });
            //SHOW CORRECT ENTRY (IF NAME WAS LAST SHOW PREVIOUS OTHERWISE SHOW NEXT)
            if ($scope.nameList.length < 1) {
                console.log('empty');
            } else if ($scope.contactIDNumber >= $scope.nameList[$scope.nameList.length - 1].contactID) {
                $scope.getDetails($scope.nameList[$scope.nameList.length - 2].contactID);
            } else {
                for (var i = $scope.nameList.length-1; i >= 0; i--) {
                    if ($scope.nameList[i].contactID < $scope.contactIDNumber) {
                        $scope.getDetails($scope.nameList[i + 2].contactID);
                        break;
                    }
                }
            } 
        });
        //HIDE DELETE MODAL
        $scope.deleteModalShown = false;
        //TURN EDIT MODE OFF
        $scope.editMode = false;
    }

});

