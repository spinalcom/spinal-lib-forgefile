/*
 * Copyright 2018 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */

import {
  spinalCore, Model, Path, Choice
} from "spinal-core-connectorjs_type";

export class ForgeFileDerivativesItem extends Model {
  constructor(params) {
    super();
    if (!params) {
      params = {};
    }
    if ((params != null ? params.name : void 0) == null) {
      params.name = "unnamed";
    }
    if ((params != null ? params.path : void 0) == null) {
      params.path = ".";
    }
    this.add_attr({
      name: params.name,
      path: params.path
    });
    this._name = this.name;
  }
}

export class ForgeFileItem extends Model {
  constructor(name = "Forge File") {
    super();
    let tmp = {
      _name: name,
      _viewable: false,
      _children: [],
      name: name,
      filepath: new Path(),
      state: new Choice(0, [
        "Initial",
        "Uploading",
        "Uploading completed",
        "Uploading to forge",
        "Upload to forge completed",
        "Translating",
        "Translating completed",
        "Export completed",
        "Failed"
      ]),
      urn: "",
      ask_token: false,
      oauth: "",
      bucket_key: ""
    };
    this.add_attr(tmp);
  }
  add_child(child) {
    this._children.push(child);
  }
  accept_child(ch) {
    return ch instanceof ForgeFileDerivativesItem;
  }
}

spinalCore.register_models([ForgeFileItem, ForgeFileDerivativesItem]);
export default ForgeFileItem;
