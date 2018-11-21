var userData = new Vue({
	el : '#userData',
	data : {
		username : '',//用户名
		email : '',//邮箱
		password : '',//密码
		repassword : '',//确认密码
	},
})

/**
 * 注册方法
 * @returns
 */
function register(){
	var bootstrapValidator = $("#userData").data('bootstrapValidator');
	bootstrapValidator.validate();
	//信息不符合要求
	if(!bootstrapValidator.isValid()){
		return false;
		
	}
	
	
}
/**
 * 这里的userData是div的Id
 */
$('#userData').bootstrapValidator({
	//        live: 'disabled',
	message: 'This value is not valid',
	feedbackIcons: {
		valid: 'glyphicon glyphicon-ok',
		invalid: 'glyphicon glyphicon-remove',
		validating: 'glyphicon glyphicon-refresh'
	},
	/**
	 * fields的每一项是表单的name值
	 */
	fields: {
		/**
		 * 用户名校验
		 * 1、非空
		 * 2、正则
		 * 3、Ajax校验
		 * 
		 */
		username: {
			validators: {
				notEmpty: {
					message: '不可为空'
				},
				regexp: {
                    regexp: /^[a-zA-Z0-9_\.]+$/,
                    message: '用户名只能由字母、数字、点和下划线组成。'
                }
			}
		},
		/**
		 * Email校验
		 */
		email: {
            validators: {
                notEmpty: {
                    message: '邮箱不能为空'
                },
                emailAddress: {
                    message: '邮箱格式不正确'
                },
                callback: {
					message: '账号已被注册，请重新填写',
					callback: function(value, validator) {
						var bool;
						$.ajax({
							url: "validate",
							type: 'post',
							dataType: 'json',
							data: {
								method : 'validateEmail',
								email : userData.email
							},
							async: false,
							success: function(json) {
								if(json.code == 0) {
									bool = false;
								} else {
									bool = true;
								}
							}

						});
						return bool;
					}
				}
            }
        },
        /**
         * 密码
         */
		password: {
			validators: {
				regexp: {
					regexp: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
					message: '密码必须为6到20位，必须包含数字与字母'
				}

			}
		},
		/**
		 * 确认密码
		 */
		repassword: {
			validators: {
				callback: {
					message: '两次密码输入不一致',
					callback: function(value, validator) {
						if(userData.password != userData.repassword)
							return false;
						else
							return true;
					}
				},
				regexp: {
					regexp: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
					message: '密码必须为6到20位，必须包含数字与字母'
				}
			}
		}
		
	}
});