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
require("spinal-core-connectorjs");

var exports = (module.exports = {});
let organTyepe = window ? window : global;

var ForgeFileDerivativesItem = class ForgeFileDerivativesItem extends organTyepe.Model {
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

  add_child(child) {
    this._children.push(child);
  }

  accept_child() {
    return false;
  }
};

exports.ForgeFileDerivativesItem = ForgeFileDerivativesItem;

var ForgeFileItem = class ForgeFileItem extends organTyepe.Model {
  constructor(name = "Forge File") {
    super();
    let tmp = {
      _name: name,
      _viewable: false,
      _children: [],
      name: name,
      filepath: new organTyepe.Path(),
      state: new organTyepe.Choice(0, [
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
};

exports.ForgeFileItem = ForgeFileItem;
