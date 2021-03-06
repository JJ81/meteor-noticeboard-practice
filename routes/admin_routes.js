/**
 * Created by yijaejun on 2016. 3. 21..
 */

Router.route('/admin/login', function (){
    this.layout('admin_layout');
    this.render('admin_login', {
        data: function () {
            this.render('admin_login');
        }
    });
});

Router.route('/admin/dashboard', function (){
    this.layout('admin_layout');
    this.render('admin_dashboard', {
        data: function () {
            return null;
        }
    });
});

Router.route('/admin/fitness-test/list/:_size/:_offset', function () {
    this.layout('admin_layout');
    var size = parseInt(this.params._size);
    var offset = parseInt(this.params._offset);

    this.render('admin_fitness_test', {
        data : function (){
            return {
                list : Programs.find({},{sort:{activate: -1, created_dt:-1, _id: -1}, skip: offset, limit: size})
                //list : [{'_id': 'asdf', 'program_title': 'test', 'creator': 'asdf'}]
            }
        }
    });
}); // {where: 'server'}를 사용할 경우 예상치 못한 에러가 발생한다.

Router.route('/admin/fitness-test/create', function (){
    this.layout('admin_layout');
    this.render('admin_fitness_create');
});

Router.route('/admin/fitness-test/content/:_id', function () {
    // override default layout
    this.layout('admin_layout'); // 이런 식으로 각 페이지의 레이아웃을 달리 설정할 수 있다.
    this.render('admin_fitness_content', {
        data: {
            content : Programs.find({_id : this.params._id})
        }
    });
});

Router.route('/admin/fitness-test/modify/:_id', function (){
    this.layout('admin_layout');
    this.render('admin_fitness_create', {
        data: {
            content: Programs.find({_id: this.params._id})
        }
    });
});

/*
* 서버를 위한 라우팅을 이와 같이 할 수 있다.
* */
//Router.route('/test', function () {
//    var req = this.request;
//    var res = this.response;
//    res.end('hello from the server\n');
//}, {where: 'server'}); // server-side router

/*
* TODO Meteor.call을 라우터에서 수행하면 어떨까?
* TODO call을 여기서 수행하게 되면 얻게 되는 장점이 무엇인가?
*
*
* */

// 로딩시 적용되는지 여부를 어떻게 알 수 있지?
Router.onBeforeAction('loading');

