/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * 'License'); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
Parse.initialize('d2P6NpJxb2HofUqW4a0lWGy4X9Pbo89Ie8SMX8V7', 'rZJ8Wj9Yb0uildXRF9dZSjsm2pgJz43EQVd9prDv');
var myScroll;
var feedScroll;
var skip = 0;
var numToLoad = 10;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, false);
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        myScroll = new IScroll('#wrapper', {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: true
        });
        feedScroll = new IScroll('#feedWrapper', {
            scrollX: false,
            scrollY: true,
            momentum: false,
            snap: true
        });
        console.log('Received Event: ' + id);
        app.setupClickEvents();
        loadFeed();
    },
    setupClickEvents: function() {
        $('.headerLeft').on('touchstart', app.navigateLeft);
        $('.headerRight').on('touchstart', app.navigateRight);
        $('.canIcon').on('touchstart', takePicture);
        $('#confirmDialogYes').on('touchstart', getLocation);
        $('#confirmDialogNo').on('touchstart', removeOverlay)
        $('#loadMoreButton').on('touchstart', loadFeed);
        $('.feedHeader').on('touchstart', function(){
            feedScroll.goToPage(0, 0, 1000);
        });
    },
    navigateLeft: function(){
        curPage = myScroll.currentPage.pageX;
        targetPage = curPage - 1;
        myScroll.goToPage(targetPage, 0, 1000);
    },
    navigateRight: function(){
        curPage = myScroll.currentPage.pageX;
        targetPage = curPage + 1;
        myScroll.goToPage(targetPage, 0, 1000);
    }
};
function addOverlay(){
    $('#cameraImageUnderlay').addClass('show');
    $('#confirmOverlay').addClass('show');
    $('#cameraText').removeClass('show');
}
function removeOverlay(){
    $('#cameraImageUnderlay').removeClass('show');
    $('#confirmOverlay').removeClass('show');
    $('#cameraImageUnderlay').css('background-image', 'none');
    $('#cameraText').addClass('show');
    $('.spinnerContainer').removeClass('show');
}

function getLocation(){
    $('#confirmOverlay').removeClass('show');
    $('.spinnerContainer').addClass('show');
    navigator.geolocation.getCurrentPosition(geolocationSuccess);
}

function geolocationSuccess(pos){
    var loc = new Parse.GeoPoint(pos.coords.latitude, pos.coords.longitude);
    pushTag(imageData, loc);
}
function loadFeed(){
    $('.spinnerContainer').addClass('show');
    getFeed(numToLoad, skip, getFeedCallback);
}
function getFeedCallback(err, results){
    if (err){
        alert('Oops, something went wrong :(');
    }
    else {
        results.forEach(function(result, index){
            var image = 'url(' + result.get('image')._url + ')';
            $('#feedScroller > #loadMoreButton').before('<div></div>');
            $('#feedScroller > *:nth-child(' + (index + 1 + skip * numToLoad) + ')').css('background-image', image);
        });
        if (results.length){
            skip += 1;
            $('#feedScroller').css('height', 548 * results.length * skip);
            feedScroll.refresh();
        }
        if (results.length < 10) {
            $('#loadMoreButton').css('display', 'none');
        }
        $('.spinnerContainer').removeClass('show');
    }
}