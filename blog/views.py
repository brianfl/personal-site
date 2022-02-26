from django.http import HttpResponse
from django.shortcuts import render
from .models import Post 

def index(request):
    post_list = list(Post.objects.all())
    post_list.reverse()
    post_list_human_readable = []
    for post in post_list:
        new_post = {'post_time':post.post_time, 'post_content':post.post_content}
        work_string = ''
        mins_worked = post.hours_worked%60
        hrs_worked = int((post.hours_worked - mins_worked)/60)
        work_string += (str(hrs_worked) + ' hours')
        if mins_worked > 0:
            work_string += (' and ' + str(mins_worked) + ' minutes')
        new_post['readable_work'] = work_string
        post_list_human_readable.append(new_post)

    return render(request, 'home.html', {'post_list':post_list_human_readable})
