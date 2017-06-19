/**
 * Created by RNaccache on 5/17/2017.
 */


var today = new Date(Date.now());

$('.ui.selection.dropdown')
    .dropdown()
;
//populates modal on Preview click
$('#preview').click(function(){
    var tagList = ($('.new-tags a'))
    $('.article-date').text(today.toDateString());
    $('.article-title').text($('.new-title').val());
    $('.article-text').html(CKEDITOR.instances.editor1.getData());
    $('.article-img').attr('src',$('.new-dep option:selected').data("support"));

    //Clear Tags and re-populate
    $('.article-tags').empty();

    //compare tag id from multiple input box (front end) to db tags (backend) to extract color and append in preview
    for (var i=0; i<tagList.length;i++){
        tags[0].forEach(function(dbTags){
            if(tagList[i].getAttribute('data-value') === dbTags._id){
                $('.article-tags').append('<p class="small ui ' + dbTags.color + ' basic label">' + tagList[i].text + '</p>');
            }
        });
    }
})
//opens modal on preview click
$('.ui.modal')
    .modal('attach events', '#preview', 'show')
;

/*populate announcement picture based on department.
if the category is public, set default image (no department shown).
 */

function populatePic() {
    var isPublic = $('.radio.checkbox [value=public]').is(":checked");
    var selectedDep = $('.new-dep option:selected').data("support");
    if(isPublic){
        $('#image-upload').val('/images/departments/Default.svg');
    } else {
        $('#image-upload').val(selectedDep);
    }
}



$.fn.form.settings.rules.myCustomRule = function() {
    // Your validation condition goes here
    return ($('#content-body p') === '');
};


//Validation form
$('.ui.form')
    .form(
        {
        fields: {
            name: {
                identifier: 'announcement[title]',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please enter the title of the announcement'
                    }
                ]
            },
            //TODO: Fix body validation
            body: {
                identifier: '',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please fill the content of the announcement'
                    }
                ]
            },
            department: {
                identifier: 'announcement[department]',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please select a department'
                    }
                ]
            },
            tags: {
                identifier: 'announcement[tags]',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please select at least 1 tag'
                    }
                ]
            },
            duration: {
                identifier: 'announcement[archiveAfter]',
                rules: [
                    {
                        type: 'integer[1..30]',
                        prompt: 'Duration cannot be more than 30 days or less than 1'
                    }
                ]
            }
        }
    });