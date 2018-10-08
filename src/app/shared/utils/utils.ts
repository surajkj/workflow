export default class Utils {

  // static getNextAction(process: string, subProcess: string, task: string){
  //   let workflow = JSON.parse(localStorage.getItem(process));   
  //   console.log(workflow); 
  //   let currentTaskIndex = Object.keys(workflow[subProcess]).indexOf(task);
    
  //   if (Object.keys(workflow[subProcess]).length - 1 == currentTaskIndex){
  //     // move to next sub-process
  //     let subProcesses = this.totalSubProcesses(workflow);
  //     let currentSubProcessIndex = Object.keys(workflow).indexOf(subProcess);
  //     let nextSubProcess = subProcesses[currentSubProcessIndex + 1];
  //     let allTasks = Object.keys(workflow[nextSubProcess]);
      
  //     //return allTasks[0];
  //     return workflow[nextSubProcess][allTasks[0]];
  //   } else{
  //     // next task
  //     let allTasks = Object.keys(workflow[subProcess]);
  //     return workflow[subProcess][allTasks[currentTaskIndex]];
  //     //return allTasks[currentTaskIndex + 1];
  //   }
  // }

  static getNextAction(process: string, subProcess: string, task: string) {
    let workflow = JSON.parse(localStorage.getItem(process));
    let taskDetail = this.taskDetail(workflow, subProcess, task);
    //console.log(taskDetail);
    if (taskDetail){
      if (taskDetail['nextTaskId'] !== null) {
        let nextTask = this.taskDetail(workflow, subProcess, taskDetail['nextTaskId']);
        if (nextTask){
          taskDetail['nextTaskUrl'] = nextTask['page'];
        }        
      } else {
        console.log('Next Task is null. So move to next sub process');
        let nextSubprocess = this.getNextSubProcess(workflow, subProcess);
        if (nextSubprocess){
          let nextTask = this.taskDetail(workflow, nextSubprocess);
          taskDetail['nextTaskUrl'] = nextTask['page'];
          taskDetail['nextTaskId'] = nextTask['id'];
        }
        //console.log('sub process' + nextSubprocess);
        
        //console.log(nextTask);
      }
    } else{
      console.log('There is some problem with workflow - 1');
      return false;
    }
    return taskDetail;
  }

  static getNextSubProcess(workflow, subProcess) {
    let subProcesses = Object.keys(workflow);
    let currentSubProcessIndex = subProcesses.indexOf(subProcess);
    return (subProcesses[currentSubProcessIndex + 1]) ? subProcesses[currentSubProcessIndex + 1] : false;
    
  }

  static taskDetail(workflow, subProcess, task= null){
    for (let loopTask of workflow[subProcess]) {
      
      if (loopTask['id'] == task || task === null){
        return loopTask
      }
    }    
  }

  static totalSubProcesses(workflow){
    return Object.keys(workflow);
  }

}