// set moment
var now = moment();

// display and set current date - moment
var currentDate = moment().format("MMM Do YYYY");
$("#currentDay").text("Today's Date: " + currentDate);

// for loop to display and hold from local storage
$(document).ready(function () {
    hourArr = $('.hour').toArray();
    for (i = 0; i < hourArr.length; i++) {
        $(hourArr[i]).siblings('textarea').text(localStorage.getItem($(hourArr[i]).attr('data-time')));
    }
});

// for loop rows, time, space to input data, and to save
for (i = 0; i < 10; i++) {

    // row for each item below
    var addRow = $('<div>').addClass('row');

    // time log
    var addTime = $('<div>').addClass('hour col-md-2').text(moment('9:00am', 'hh:mm A').add(i, 'hours').format('hA'));
    addTime.attr('data-time', moment('9:00am', 'hh:mm a').add(i, 'hours').format('hA'));

    // data input section
    var addData = $('<textarea>').addClass('col-md-9');

    // save button
    var saveButton = $('<button>').addClass('saveBtn col-md-1').html('<i class="fas fa-save"></i>');

    // ORDER (row, time block, data input, save btn)
    // row for each item
    $('.container').append(addRow);

    // time block in row
    $(addRow).append(addTime);

    // then data input section
    $(addTime).after(addData);

    // then save button to submit to local storage 
    $(addData).after(saveButton);

    // if else to change color of active/inactive rows
    // red
    if (now.isSame(moment('9:00am', 'hh:mm A').add(i, 'hours'), 'hour')) {
        $(addData).addClass('present');
    }
    // green
    else if (now.isBefore(moment('9:00am', 'hh:mm A').add(i, 'hours'), 'hour')) {
        $(addData).addClass('future');
    }
    // grey
    else if (now.isAfter(moment('9:00am', 'hh:mm A').add(i, 'hours'), 'hour')) {
        $(addData).addClass('past');
    }
}

// save local storage
$('.saveBtn').on('click', function () {

    localStorage.setItem($(this).siblings('div.hour').attr('data-time'), $(this).siblings('textarea').val())
});