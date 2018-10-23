<template>
  <div>
    <Row type="flex" justify="space-between" align="middle">
      <Col>
        <div class="alertTips">
          <Alert>
            可筛选要展示的列
          </Alert>
        </div>
      </Col>
      <Col>
        <tableColumnFilter
          :filterFiled="[
                 '学期',
                 '年级',
                 '学院',
                 '专业',
                 '课程名称',
                 '课程代码',
                 '教学班名称',
                 '实际班级人数',
                 '是否录入成绩',
                 '是否排课',
                 '是否选课',
                 '成绩录入人',
                 '连排节数',
                 '周学时',
                 '学时',
                 '学分',
                 '成绩分制',
                 '老师端展示形式',
                 '学生端展现形式',
                 '学生选课比例',
                 '是否需要校验地点冲突',
                 '是否需要校验教师冲突',
                 '是否需要校验学生冲突',
                 '答疑学时',
                 '授课教师',
                 '上课周次',
                ]"
          :defaultCheck="[
                 '学期',
                 '年级',
                 '学院',
                 '专业',
                 '课程名称',
                 '课程代码',
                 '教学班名称',
                 '实际班级人数'
              ]"
          @filter-field-change="refreshTable">
        </tableColumnFilter>
      </Col>
    </Row>

    <div>
      <Table :data="tableData" :columns="tableColumns" border></Table>
    </div>

  </div>
</template>
<script>
  import tableColumnFilter from './tableColumnFilter'

  export default {
    name: 'taskManager',
    data() {
      let index = {
        title: ' ',
        type: 'index',
        width: 60,
        align: 'center'
      };
      let term = {
        title: '学期',
        key: 'term',
        align: 'center',
        customOrder: 2
      };
      let grade = {
        title: '年级',
        key: 'grade',
        align: 'center',
        customOrder: 3
      };
      let departmentName = {
        title: '学院',
        key: 'departmentName',
        align: 'center',
        customOrder: 4
      };
      let major = {
        title: '专业',
        key: 'major',
        align: 'center',
        customOrder: 5
      };
      let courseName = {
        title: '课程名称',
        key: 'courseName',
        align: 'center',
        customOrder: 6
      };
      let courseCode = {
        title: '课程代码',
        key: 'courseCode',
        align: 'center',
        customOrder: 7
      };
      let className = {
        title: '教学班名称',
        key: 'className',
        align: 'center',
        customOrder: 8
      };
      let classCount = {
        title: '实际班级人数',
        key: 'classCount',
        align: 'center',
        customOrder: 9,
        render: (h, params) => {
          return h('a', {}, params.row.classCount)
        }
      };
      const hasScore = {
        title: '是否录入成绩',
        key: 'hasScore',
        align: 'center',
        customOrder: 10
      };
      let hasSchedule = {
        title: '是否排课',
        key: 'hasSchedule',
        align: 'center',
        customOrder: 11
      };
      let hasChoose = {
        title: '是否选课',
        key: 'hasChoose',
        align: 'center',
        customOrder: 12
      };
      let scorePerson = {
        title: '成绩录入人',
        key: 'scorePerson',
        align: 'center',
        customOrder: 13
      };
      let sequentNum = {

        title: '连排节数',
        key: 'sequentNum',
        align: 'center',
        customOrder: 14
      };
      let weekTime = {
        title: '周学时',
        key: 'weekTime',
        align: 'center',
        customOrder: 15
      };
      let time = {
        title: '学时',
        key: 'time',
        align: 'center',
        customOrder: 16
      };
      let credit = {
        title: '学分',
        key: 'credit',
        align: 'center',
        customOrder: 17
      };
      let scoreFormat = {
        title: '成绩分制',
        key: 'scoreFormat',
        align: 'center',
        customOrder: 18
      };
      let displayTeacher = {
        title: '老师端展示形式',
        key: 'displayTeacher',
        align: 'center',
        customOrder: 19
      };
      let displayStudent = {
        title: '学生端展现形式',
        key: 'displayStudent',
        align: 'center',
        customOrder: 20
      };
      let percent = {
        title: '学生选课比例',
        key: 'percent',
        align: 'center',
        customOrder: 21
      };
      let conflictPlace = {
        title: '是否需要校验地点冲突',
        key: 'conflictPlace',
        align: 'center',
        customOrder: 22
      };
      let conflictTeacher = {
        title: '是否需要校验教师冲突',
        key: 'conflictTeacher',
        align: 'center',
        customOrder: 23
      };
      let conflictStudent = {
        title: '是否需要校验学生冲突',
        key: 'conflictStudent',
        align: 'center',
        customOrder: 24
      };
      let questionTime = {
        title: '答疑学时',
        key: 'questionTime',
        align: 'center',
        customOrder: 25
      };
      let teacher = {
        title: '授课教师',
        key: 'teacher',
        align: 'center',
        customOrder: 26
      };
      let week = {
        title: '上课周次',
        key: 'week',
        align: 'center',
        customOrder: 27
      };
      let action = {
        title: '操作',
        key: 'action',
        width: 160,
        align: 'center',
        render: (h, params) => {
          let readView = h('a', {
            on: {
              click: () => {

              }
            }
          }, '管理学生名单');
          return h('div', {}, [readView]);
        },
      };
      return {
        tableColumns: [
          index, term, grade, departmentName, major, courseName, courseCode, className, classCount, action
        ],
        tableData: [
          {
            term: '第一学期',
            grade: '2018级',
            departmentName: '食品学院',
            major: '食品加工技术',
            courseName: '大学生心里健康',
            courseCode: '98903782',
            className: '2018级体育-食品营养与健康1班',
            classCount: '100',
            hasScore: '是',
            hasSchedule: '是',
            hasChoose: '是',
            scorePerson: 'zhang',
            sequentNum: '2',
            weekTime: '2',
            time: '2',
            credit: '2',
            scoreFormat: '百分',
            displayTeacher: '百分',
            displayStudent: '百分',
            percent: '100%',
            conflictPlace: '是',
            conflictTeacher: '是',
            conflictStudent: '是',
            questionTime: '2',
            teacher: '2',
            week: '2',
          }
        ],
        //固定的两个列
        index,
        action,
        //用于匹配
        labelInfo: {
          学期: 'term',
          年级: 'grade',
          学院: 'departmentName',
          专业: 'major',
          课程名称: 'courseName',
          课程代码: 'courseCode',
          教学班名称: 'className',
          实际班级人数: 'classCount',
          是否录入成绩: 'hasScore',
          是否排课: 'hasSchedule',
          是否选课: 'hasChoose',
          成绩录入人: 'scorePerson',
          连排节数: 'sequentNum',
          周学时: 'weekTime',
          学时: 'time',
          学分: 'credit',
          成绩分制: 'scoreFormat',
          老师端展示形式: 'displayTeacher',
          学生端展现形式: 'displayStudent',
          学生选课比例: 'percent',
          是否需要校验地点冲突: 'conflictPlace',
          是否需要校验教师冲突: 'conflictTeacher',
          是否需要校验学生冲突: 'conflictStudent',
          答疑学时: 'questionTime',
          授课教师: 'teacher',
          上课周次: 'week',
        },
        //所有列
        tableFieldInfo: {
          term: term,
          grade: grade,
          departmentName: departmentName,
          major: major,
          courseName: courseName,
          courseCode: courseCode,
          className: className,
          classCount: classCount,
          hasScore: hasScore,
          hasSchedule: hasSchedule,
          hasChoose: hasChoose,
          scorePerson: scorePerson,
          sequentNum: sequentNum,
          weekTime: weekTime,
          time: time,
          credit: credit,
          scoreFormat: scoreFormat,
          displayTeacher: displayTeacher,
          displayStudent: displayStudent,
          percent: percent,
          conflictPlace: conflictPlace,
          conflictTeacher: conflictTeacher,
          conflictStudent: conflictStudent,
          questionTime: questionTime,
          teacher: teacher,
          week: week,
        }
      }
    },
    methods: {
      //过滤字段，刷新表格显示内容
      refreshTable(selectedField) {
        let showField = [];
        for (let item of selectedField) {
          let fieldName = this.labelInfo[item];
          showField.push(this.tableFieldInfo[fieldName])
        }
        if (showField.length) {
          showField.sort((a, b) => {
            return a.customOrder > b.customOrder
          })
        }
        //序号和操作固定
        this.tableColumns = [this.index, ...showField, this.action];
      },

    },
    components: {
      tableColumnFilter,
    }
  }
</script>
<style scoped>

</style>
