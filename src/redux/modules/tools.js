/**
 * Created by reky on 2016/11/10.
 */

export function ActionCreate(actionName,actionText){
  return {
    type: actionName,
    text: actionText,
  }
};

