// Copyright 2015 SpinalCom  www.spinalcom.com

// This file is part of SpinalCore.

// SpinalCore is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Soda is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
// You should have received a copy of the GNU General Public License
// along with Soda. If not, see <http://www.gnu.org/licenses/>.
require("spinal-lib-issim");

// var TreeItem = class TreeItem extends Model {
//   constructor() {
//     super();
//     this.add_attr({
//       _ico: "",
//       _name: "",
//       _children: [],
//       _output: [],
//       _viewable: 0, // eye
//       _allow_vmod: true, // autorise check/uncheck view
//       _name_class: "",
//       _context_modules: new Lst(),
//       _context_actions: new Lst()
//     });
//   }

//   add_context_modules(context_module) {
//     return this._context_modules.push(context_module);
//   }

//   add_context_actions(context_action) {
//     return this._context_actions.push(context_action);
//   }

//   display_suppl_context_actions(context_action) {}

//   //function to overload by adding additionnal actions in context actions
//   display_context_actions() {
//     var contex_action;
//     contex_action = new Lst();
//     contex_action.push(new TreeAppAction_Save());
//     this.display_suppl_context_actions(contex_action);
//     return contex_action;
//   }


//   // child must be an instance of TreeItem
//   add_child(child) {
//     return this._children.push(child);
//   }

//   // remove child, by ref or by num
//   rem_child(child) {
//     var j, num_c, ref;
//     if (child instanceof TreeItem) {
//       for (num_c = j = 0, ref = this._children.length; 0 <= ref ? j < ref : j > ref; num_c = 0 <= ref ? ++j : --j) {
//         if (this._children[num_c] === child) {
//           this._children.splice(num_c, 1);
//           return;
//         }
//       }
//     } else {
//       return this._children.splice(child, 1);
//     }
//   }

//   detect_child(f) {
//     var i, j, len, ref;
//     ref = this._children;
//     for (j = 0, len = ref.length; j < len; j++) {
//       i = ref[j];
//       if (f(i)) {
//         return i;
//       }
//     }
//     return void 0;
//   }


//   // child must be an instance of TreeItem
//   add_output(child) {
//     return this._output.push(child);
//   }

//   // remove child, by ref or by num
//   rem_output(child) {
//     var j, num_c, ref;
//     if (child instanceof TreeItem) {
//       for (num_c = j = 0, ref = this._output.length; 0 <= ref ? j < ref : j > ref; num_c = 0 <= ref ? ++j : --j) {
//         if (this._output[num_c] === child) {
//           this._output.splice(num_c, 1);
//           return;
//         }
//       }
//     } else {
//       return this._output.splice(child, 1);
//     }
//   }

//   draw(info) {
//     var j, len, ref, results, s;
//     if (this.sub_canvas_items != null) {
//       ref = this.sub_canvas_items();
//       results = [];
//       for (j = 0, len = ref.length; j < len; j++) {
//         s = ref[j];
//         results.push(s.draw(info));
//       }
//       return results;
//     }
//   }

//   anim_min_max() {}

//   z_index() {
//     return 0;
//   }

//   to_string() {
//     return this._name.get();
//   }

// };


var ForgeFileDerivativesItem = class ForgeFileDerivativesItem extends TreeItem {
  constructor(params) {
    var i, item, k, len, name, ref, res, v;
    super();
    if (params != null && params.outputType) {
      name = params.outputType;
    } else if (params != null && params.name) {
      name = params.name;
    } else if (params != null && params.role) {
      name = params.role;
    } else {
      name = "no name";
    }
    this.add_attr({
      name: name
    });
    this._name.set(this.name);
    if (!params) {
      return;
    }
    res = {};
    for (k in params) {
      v = params[k];
      if (params.hasOwnProperty(k)) {
        if (k === "name") {
          continue;
        } else if (k === "children") {
          ref = params[k];
          for (i = 0, len = ref.length; i < len; i++) {
            item = ref[i];
            this.add_child(new ForgeFileDerivativesItem(item));
          }
        } else {
          res[k] = params[k];
        }
      }
    }
    this.add_attr(res);
  }

  display_suppl_context_actions(context_action) {}

  accept_child(ch) {
    return ch instanceof ForgeFileDerivativesItem;
  }

};

var ForgeFileItem = class ForgeFileItem extends TreeItem {
  constructor(name = "Forge File") {
    super();
    this._name.set(name);
    this._viewable.set(false);


    tmp = {
      name: this._name,
      filepath: new Path(),
      state: new Choice(0, ["Initial",
        "Uploading", "Uploading completed",
        "Uploading to forge", "Upload to forge completed",
        "Translating", "Translating completed",
        "Export completed", "Failed"
      ]),
      urn: "",
      ask_token: false,
      oauth: "",
      bucket_key: ""
    };
    this.add_attr(tmp);
  }

  accept_child(ch) {
    return (ch instanceof ForgeFileDerivativesItem);
  }
};