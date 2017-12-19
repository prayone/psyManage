<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row>
            <Col span="24">
                <Row>
                    <Card>
                        <Row type="flex" class="user-infor">
                            <Col span="2">
                                <Row class-name="made-child-con-middle" type="flex" align="middle">
                                    <img class="avator-img" :src="avatorPath" />
                                </Row>
                            </Col>
                            <Col span="22" style="padding: 15px;">
                                <h2>你好，{{nickname}}，欢迎来到心理测评后台管理系统</h2><br>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </Col>
        </Row>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    name: 'home',
    components: {
       
    },
    data () {
        return {
            count: {
            },
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath
        },
        nickname () {
            return  Cookies.get('nickname')
        }
    },
    methods: {
       
    }
};
</script>
