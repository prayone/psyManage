<style lang="less">
    @import '../../styles/common.less';
    @import './table.less';
</style>
<style lang="less">
    .answer_key input{
        text-align: center;
    }
    .add_question{
        min-height: 100%;
        background: #fff;
    }
</style>
<template>
    <Row class="add_question">
        <Col push="4" span="16">
            <Card  :padding="10" style="margin:10px;">
                <p slot="title" >
                    添加题目
                </p>
                <Form :label-width="50">
                    <FormItem label="标题" prop="name">
                        <Input  id="qtitle" placeholder="请输入标题"></Input>
                    </FormItem>
                    <FormItem label="类型" prop="mail">
                        <Input  id="qtype" placeholder="请输入类型"></Input>
                    </FormItem>
                    <Card  :padding="10" style="margin:10px;">
                        <Row slot="title">
                            <p>答案选项</p>
                        </Row>
                        <template v-for="(value,key) in answersArr">
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
                        <Row>
                            <Col span="4" push="10">
                                <Button type="primary" icon="plus-round" @click="addForm">添加一行</Button>
                            </Col>
                        </Row>
                    </Card>
                    <Row>
                        <Col span="4" push="16">
                            <Button type="primary" icon="checkmark-round" @click="saveForm">确定</Button>
                        </Col>
                        <Col span="4" push="15">
                            <Button type="primary" icon="android-delete" @click="clearForm">清空</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Col>
    </Row>
</template>
<script>
export default {
    name: 'add_question',
    data () {
        return {
            answersArr:[{"":""}]
        };
    },
    methods: {
       addForm(){
         this.answersArr.push({"":""})
       },
       async saveForm(){
            let title = document.querySelector('#qtitle input').value
            let type = document.querySelector('#qtype input').value
            let keynodes = document.querySelectorAll('.answer_key input')
            let valuenodes = document.querySelectorAll('.answer_value input')
            let answers_json = []
            for(let i = 0 ;i < keynodes.length ;i++){
                let obj = {}
                obj[keynodes[i].value] = valuenodes[i].value
                answers_json.push(obj)
            }
            let data = {
                title:title,
                type:type,
                answers_json:answers_json
            }
            const res = await this.Api.post('/rs/question',data)
            if(res.data.info){
                this.$Message.info('添加成功')
                this.clearForm()
            }
       },
       clearForm(){
            document.querySelector('#qtitle input').value = ""
            document.querySelector('#qtype input').value  = ""
            this.answersArr = []
            this.answersArr.push({"":""})
            document.querySelector('.answer_key input').value = ""
            document.querySelector('.answer_value input').value = ""
       }
    }
};
</script>
