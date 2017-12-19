<style lang="less">
    @import '../../styles/common.less';
    @import './table.less';
</style>
<style lang="less">
    .answer_key input{
        text-align: center;
    }
</style>
<template>
    <div>
        <Row>
            <Col span="24">
                <Card :bordered="false"> 
                    <Row slot="title">
                        <Col span="4">
                            <p >题目管理</p>
                        </Col>
                        <Col span="4" push="15">
                            <router-link to="/question/addQuestion">
                                <Button type="primary" icon="plus-round">添加题目</Button>
                            </router-link> 
                        </Col>
                    </Row>
                    <Row v-for="(item,index) in dataRows">
                        <Col span="12" push="6" key="index">
                            <Card  :padding="10" style="margin:10px;">
                                <Row slot="title">
                                    <Col span="22">{{(currentPage-1)*pageCnt+index+1}}、{{item.title}}</Col>
                                    <Col  span="1"><Icon @click.native="operateQ('editModal',index)" type="edit" /></Col>
                                    <Col  span="1"><Icon @click.native="operateQ('delModal',index)" type="trash-a"></Icon></Col>
                                </Row>
                                <template v-for="(value,key) in item.answers_json">
                                     <template v-for="(answer_value,answer_key) in value">
                                        <p>
                                             {{answer_key}}：{{answer_value}}
                                        </p>
                                    </template>
                                </template>
                            </Card>
                        </Col>
                    </Row>
                    <div style="margin: 20px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="totalPage" @on-change="changePage" :page-size="pageCnt"></Page>
                        </div>
                    </div>
                </Card>

            </Col>
        </Row>
        <Modal
            v-model="editModal"
            title="题目编辑"
            @on-ok="editConfirm"
            @on-cancel="editModal = false">
            <Form :label-width="50">
                 <FormItem label="标题" prop="name">
                    <Input  :value="currentQ.title" placeholder="请输入标题"></Input>
                </FormItem>
                <FormItem label="类型" prop="mail">
                    <Input  :value="currentQ.type" placeholder="请输入类型"></Input>
                </FormItem>
               <Card  :padding="10" style="margin:10px;">
                    <Row slot="title">
                        <p>答案选项</p>
                    </Row>
                    <template v-for="(value,key) in currentQ.answers_json">
                         <template v-for="(answer_value,answer_key) in value">
                             <Row style="margin:10px;" :gutter="10">
                                <Col span="4">
                                    <Input class="answer_key" :value="answer_key" placeholder="请输入key"></Input>
                                </Col>
                                <Col span="20">
                                    <Input class="answer_value" :value="answer_value" placeholder="请输入答案"></Input>
                                </Col>
                            </Row>
                        </template>
                    </template>
                </Card>
            </Form>
        </Modal>
         <Modal v-model="delModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>此操作将永久删除该题,</p>
                <p>是否继续删除？</p>
            </div>
            <div slot="footer">
                <i-button type="error" size="large" long :loading="modal_loading" @click="deleteQ">删除</i-button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'question_list',
    data () {
        return {
            totalPage: 0,
            currentPage: 1,
            pageCnt: 10, // 每页10条
            dataRows:[],
            editModal:false,
            // 删除相关
            delModal:false,
            modal_loading: false,
            currentQ:{},//编辑或者删除的对象
        };
    },
    created(){
        this.getData(1)
    },
    activated(){
       this.getData(1)
    },
    methods: {
        async getData(page) {
            let data = {
                page:page||this.currentPage,
                size:this.pageCnt,
            }
            const res = await this.Api.get('/rs/question', data)
            if(res.data.records){
               this.totalPage = res.data.records*1
               this.dataRows = res.data.rows
            }
        },
        changePage(pageNumber) {
            this.currentPage = pageNumber
            this.getData(pageNumber)
        },
        operateQ(opName,index){
            this[opName] = true
            this.currentQ = this.dataRows[index]//当前操作项存下来
        },
        async deleteQ(){
            this.modal_loading = true
            const res = await this.Api.delete("/rs/question/"+this.currentQ.id)
            if(res.data.info){
                this.$Message.info('删除成功')
                this.delModal = false
                this.modal_loading = false
                //删除成功以后重新渲染
                this.getData()
            }
        },
        async editConfirm(){
            let qid = this.currentQ.id
            let data = {}
            const res = await this.Api.delete("/rs/question/"+this.currentQ.id,data)
            if(res.data.info){
                this.$Message.info('修改成功')
                //删除成功以后重新渲染
                this.getData()
            }
        }
    }
};
</script>
