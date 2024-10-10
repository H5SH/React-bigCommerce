"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_gift-certificate_js"],{

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(cert) {
  if (typeof cert !== 'string' || cert.length === 0) {
    return false;
  }

  // Add any custom gift certificate validation logic here
  return true;
}

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTranslationDictionary: () => (/* binding */ createTranslationDictionary)
/* harmony export */ });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ }),

/***/ "./assets/js/theme/gift-certificate.js":
/*!*********************************************!*\
  !*** ./assets/js/theme/gift-certificate.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GiftCertificate)
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }








var GiftCertificate = /*#__PURE__*/function (_PageManager) {
  function GiftCertificate(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.validationDictionary = (0,_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__.createTranslationDictionary)(context);
    var $certBalanceForm = $('#gift-certificate-balance');
    var purchaseModel = {
      recipientName: function recipientName(val) {
        return val.length;
      },
      recipientEmail: function recipientEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      senderName: function senderName(val) {
        return val.length;
      },
      senderEmail: function senderEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      customAmount: function customAmount(value, min, max) {
        return value && value >= min && value <= max;
      },
      setAmount: function setAmount(value, options) {
        var found = false;
        options.forEach(function (option) {
          if (option === value) {
            found = true;
            return false;
          }
        });
        return found;
      }
    };
    var $purchaseForm = $('#gift-certificate-form');
    var $customAmounts = $purchaseForm.find('input[name="certificate_amount"]');
    var purchaseValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: '#gift-certificate-form input[type="submit"]',
      delay: 300,
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__.announceInputErrorMessage
    });
    if ($customAmounts.length) {
      var $element = $purchaseForm.find('input[name="certificate_amount"]');
      var min = $element.data('min');
      var minFormatted = $element.data('minFormatted');
      var max = $element.data('max');
      var maxFormatted = $element.data('maxFormatted');
      var insertFormattedAmountsIntoErrorMessage = function insertFormattedAmountsIntoErrorMessage(message) {
        for (var _len = arguments.length, amountRange = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          amountRange[_key - 1] = arguments[_key];
        }
        var amountPlaceholders = ['[MIN]', '[MAX]'];
        var updatedErrorText = message;
        amountPlaceholders.forEach(function (placeholder, i) {
          updatedErrorText = updatedErrorText.includes(placeholder) ? updatedErrorText.replace(placeholder, amountRange[i]) : updatedErrorText;
        });
        return updatedErrorText;
      };
      purchaseValidator.add({
        selector: '#gift-certificate-form input[name="certificate_amount"]',
        validate: function validate(cb, val) {
          var numberVal = Number(val);
          if (!numberVal) {
            cb(false);
          }
          cb(numberVal >= min && numberVal <= max);
        },
        errorMessage: insertFormattedAmountsIntoErrorMessage(_this.validationDictionary.certificate_amount_range, minFormatted, maxFormatted)
      });
    }
    purchaseValidator.add([{
      selector: '#gift-certificate-form input[name="to_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientName(val);
        cb(result);
      },
      errorMessage: _this.context.toName
    }, {
      selector: '#gift-certificate-form input[name="to_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientEmail(val);
        cb(result);
      },
      errorMessage: _this.context.toEmail
    }, {
      selector: '#gift-certificate-form input[name="from_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderName(val);
        cb(result);
      },
      errorMessage: _this.context.fromName
    }, {
      selector: '#gift-certificate-form input[name="from_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderEmail(val);
        cb(result);
      },
      errorMessage: _this.context.fromEmail
    }, {
      selector: '#gift-certificate-form input[name="certificate_theme"]:first-of-type',
      triggeredBy: '#gift-certificate-form input[name="certificate_theme"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="certificate_theme"]:checked').val();
        cb(typeof val === 'string');
      },
      errorMessage: _this.context.certTheme
    }, {
      selector: '#gift-certificate-form input[name="agree"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }, {
      selector: '#gift-certificate-form input[name="agree2"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree2"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }]);
    if ($certBalanceForm.length) {
      var balanceVal = _this.checkCertBalanceValidator($certBalanceForm);
      $certBalanceForm.on('submit', function () {
        balanceVal.performCheck();
        if (!balanceVal.areAll('valid')) {
          return false;
        }
      });
    }
    $purchaseForm.on('submit', function (event) {
      purchaseValidator.performCheck();
      if (!purchaseValidator.areAll('valid')) {
        return event.preventDefault();
      }
    });
    var createFrame = function createFrame(container, html) {
      var frame = $('<iframe />').width('100%').attr('frameBorder', '0').appendTo(container)[0];

      // Grab the frame's document object
      var frameDoc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument;
      frameDoc.open();
      frameDoc.write(html);
      frameDoc.close();

      // Calculate max height for the iframe
      var maxheight = Math.max($(window).height() - 300, 300);

      // Auto adjust the iframe's height once its document is ready
      $(frameDoc).ready(function () {
        var height = Math.min(frameDoc.body.scrollHeight + 20, maxheight);
        $(frame).height(height);
      });
    };
    $('#gift-certificate-preview').click(function (event) {
      event.preventDefault();
      purchaseValidator.performCheck();
      if (!purchaseValidator.areAll('valid')) {
        return;
      }
      var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
      var previewUrl = $(event.currentTarget).data('previewUrl') + "&" + $purchaseForm.serialize();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__.api.getPage(previewUrl, {}, function (err, content) {
        if (err) {
          return modal.updateContent(_this.context.previewError);
        }
        modal.updateContent();
        var container = $('#modal-content');
        createFrame(container, content);
      });
    });
    return _this;
  }
  _inheritsLoose(GiftCertificate, _PageManager);
  var _proto = GiftCertificate.prototype;
  _proto.checkCertBalanceValidator = function checkCertBalanceValidator($balanceForm) {
    var balanceValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: $balanceForm.find('input[type="submit"]'),
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__.announceInputErrorMessage
    });
    balanceValidator.add({
      selector: $balanceForm.find('input[name="giftcertificatecode"]'),
      validate: function validate(cb, val) {
        cb((0,_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__["default"])(val));
      },
      errorMessage: this.validationDictionary.invalid_gift_certificate
    });
    return balanceValidator;
  };
  return GiftCertificate;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9naWZ0LWNlcnRpZmljYXRlX2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBZSxvQ0FBVUEsSUFBSSxFQUFFO0VBQzNCLElBQUksT0FBT0EsSUFBSSxLQUFLLFFBQVEsSUFBSUEsSUFBSSxDQUFDQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0lBQy9DLE9BQU8sS0FBSztFQUNoQjs7RUFFQTtFQUNBLE9BQU8sSUFBSTtBQUNmOzs7Ozs7Ozs7Ozs7OztBQ1BBLElBQU1DLFlBQVksR0FBRyxjQUFjO0FBQ25DLElBQU1DLCtCQUErQixHQUFHLFNBQWxDQSwrQkFBK0JBLENBQUlDLFVBQVU7RUFBQSxPQUFLLENBQUMsQ0FBQ0MsTUFBTSxDQUFDQyxJQUFJLENBQUNGLFVBQVUsQ0FBQ0YsWUFBWSxDQUFDLENBQUMsQ0FBQ0QsTUFBTTtBQUFBO0FBQ3RHLElBQU1NLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBc0JBLENBQUEsRUFBOEI7RUFDdEQsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdDLFNBQUEsQ0FBbUJSLE1BQU0sRUFBRU8sQ0FBQyxFQUFFLEVBQUU7SUFDaEQsSUFBTUosVUFBVSxHQUFHTSxJQUFJLENBQUNDLEtBQUssQ0FBb0JILENBQUMsUUFBQUMsU0FBQSxDQUFBUixNQUFBLElBQURPLENBQUMsR0FBQUksU0FBQSxHQUFBSCxTQUFBLENBQURELENBQUMsQ0FBQyxDQUFDO0lBQ3BELElBQUlMLCtCQUErQixDQUFDQyxVQUFVLENBQUMsRUFBRTtNQUM3QyxPQUFPQSxVQUFVO0lBQ3JCO0VBQ0o7QUFDSixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLElBQU1TLDJCQUEyQixHQUFHLFNBQTlCQSwyQkFBMkJBLENBQUlDLE9BQU8sRUFBSztFQUNwRCxJQUFRQyx3QkFBd0IsR0FBd0VELE9BQU8sQ0FBdkdDLHdCQUF3QjtJQUFF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QXlCQTtJQUNsQyxDQUFDLENBQUM7SUFFRjZHLGdCQUFnQixDQUFDNUQsR0FBRyxDQUFDO01BQ2pCQyxRQUFRLEVBQUUwRCxZQUFZLENBQUMvRSxJQUFJLENBQUMsbUNBQW1DLENBQUM7TUFDaEVzQixRQUFRLFdBQVJBLFFBQVFBLENBQUNDLEVBQUUsRUFBRXhDLEdBQUcsRUFBRTtRQUNkd0MsRUFBRSxDQUFDdEQsOEVBQW9CLENBQUNjLEdBQUcsQ0FBQyxDQUFDO01BQ2pDLENBQUM7TUFDRDJDLFlBQVksRUFBRSxJQUFJLENBQUNoRCxvQkFBb0IsQ0FBQ3VHO0lBQzVDLENBQUMsQ0FBQztJQUVGLE9BQU9ELGdCQUFnQjtFQUMzQixDQUFDO0VBQUEsT0FBQTFHLGVBQUE7QUFBQSxFQWxPd0NQLHFEQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvZ2lmdC1jZXJ0aWZpY2F0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY2VydCkge1xuICAgIGlmICh0eXBlb2YgY2VydCAhPT0gJ3N0cmluZycgfHwgY2VydC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEFkZCBhbnkgY3VzdG9tIGdpZnQgY2VydGlmaWNhdGUgdmFsaWRhdGlvbiBsb2dpYyBoZXJlXG4gICAgcmV0dXJuIHRydWU7XG59XG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iLCJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IG5vZCBmcm9tICcuL2NvbW1vbi9ub2QnO1xuaW1wb3J0IGNoZWNrSXNHaWZ0Q2VydFZhbGlkIGZyb20gJy4vY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yJztcbmltcG9ydCBmb3JtTW9kZWwgZnJvbSAnLi9jb21tb24vbW9kZWxzL2Zvcm1zJztcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5pbXBvcnQgeyBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIH0gZnJvbSAnLi9jb21tb24vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgeyBhcGkgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgeyBkZWZhdWx0TW9kYWwgfSBmcm9tICcuL2dsb2JhbC9tb2RhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdpZnRDZXJ0aWZpY2F0ZSBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xuXG4gICAgICAgIGNvbnN0ICRjZXJ0QmFsYW5jZUZvcm0gPSAkKCcjZ2lmdC1jZXJ0aWZpY2F0ZS1iYWxhbmNlJyk7XG5cbiAgICAgICAgY29uc3QgcHVyY2hhc2VNb2RlbCA9IHtcbiAgICAgICAgICAgIHJlY2lwaWVudE5hbWUodmFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5sZW5ndGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVjaXBpZW50RW1haWwoLi4uYXJncykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtTW9kZWwuZW1haWwoLi4uYXJncyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VuZGVyTmFtZSh2YWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsLmxlbmd0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZW5kZXJFbWFpbCguLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1Nb2RlbC5lbWFpbCguLi5hcmdzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjdXN0b21BbW91bnQodmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlID49IG1pbiAmJiB2YWx1ZSA8PSBtYXg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0QW1vdW50KHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBvcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0ICRwdXJjaGFzZUZvcm0gPSAkKCcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtJyk7XG4gICAgICAgIGNvbnN0ICRjdXN0b21BbW91bnRzID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfYW1vdW50XCJdJyk7XG4gICAgICAgIGNvbnN0IHB1cmNoYXNlVmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScsXG4gICAgICAgICAgICBkZWxheTogMzAwLFxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoJGN1c3RvbUFtb3VudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCAkZWxlbWVudCA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX2Ftb3VudFwiXScpO1xuICAgICAgICAgICAgY29uc3QgbWluID0gJGVsZW1lbnQuZGF0YSgnbWluJyk7XG4gICAgICAgICAgICBjb25zdCBtaW5Gb3JtYXR0ZWQgPSAkZWxlbWVudC5kYXRhKCdtaW5Gb3JtYXR0ZWQnKTtcbiAgICAgICAgICAgIGNvbnN0IG1heCA9ICRlbGVtZW50LmRhdGEoJ21heCcpO1xuICAgICAgICAgICAgY29uc3QgbWF4Rm9ybWF0dGVkID0gJGVsZW1lbnQuZGF0YSgnbWF4Rm9ybWF0dGVkJyk7XG4gICAgICAgICAgICBjb25zdCBpbnNlcnRGb3JtYXR0ZWRBbW91bnRzSW50b0Vycm9yTWVzc2FnZSA9IChtZXNzYWdlLCAuLi5hbW91bnRSYW5nZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFtb3VudFBsYWNlaG9sZGVycyA9IFsnW01JTl0nLCAnW01BWF0nXTtcbiAgICAgICAgICAgICAgICBsZXQgdXBkYXRlZEVycm9yVGV4dCA9IG1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgYW1vdW50UGxhY2Vob2xkZXJzLmZvckVhY2goKHBsYWNlaG9sZGVyLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRFcnJvclRleHQgPSB1cGRhdGVkRXJyb3JUZXh0LmluY2x1ZGVzKHBsYWNlaG9sZGVyKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkRXJyb3JUZXh0LnJlcGxhY2UocGxhY2Vob2xkZXIsIGFtb3VudFJhbmdlW2ldKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkRXJyb3JUZXh0O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGVkRXJyb3JUZXh0O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcHVyY2hhc2VWYWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX2Ftb3VudFwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG51bWJlclZhbCA9IE51bWJlcih2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghbnVtYmVyVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihudW1iZXJWYWwgPj0gbWluICYmIG51bWJlclZhbCA8PSBtYXgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBpbnNlcnRGb3JtYXR0ZWRBbW91bnRzSW50b0Vycm9yTWVzc2FnZSh0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5LmNlcnRpZmljYXRlX2Ftb3VudF9yYW5nZSwgbWluRm9ybWF0dGVkLCBtYXhGb3JtYXR0ZWQpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdXJjaGFzZVZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwidG9fbmFtZVwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHB1cmNoYXNlTW9kZWwucmVjaXBpZW50TmFtZSh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC50b05hbWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwidG9fZW1haWxcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwdXJjaGFzZU1vZGVsLnJlY2lwaWVudEVtYWlsKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnRvRW1haWwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiZnJvbV9uYW1lXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcHVyY2hhc2VNb2RlbC5zZW5kZXJOYW1lKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmZyb21OYW1lLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImZyb21fZW1haWxcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwdXJjaGFzZU1vZGVsLnNlbmRlckVtYWlsKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmZyb21FbWFpbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV90aGVtZVwiXTpmaXJzdC1vZi10eXBlJyxcbiAgICAgICAgICAgICAgICB0cmlnZ2VyZWRCeTogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX3RoZW1lXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX3RoZW1lXCJdOmNoZWNrZWQnKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICBjYih0eXBlb2YgKHZhbCkgPT09ICdzdHJpbmcnKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmNlcnRUaGVtZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJhZ3JlZVwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSAkcHVyY2hhc2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJhZ3JlZVwiXScpLmdldCgwKS5jaGVja2VkO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHZhbCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5hZ3JlZVRvVGVybXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiYWdyZWUyXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImFncmVlMlwiXScpLmdldCgwKS5jaGVja2VkO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHZhbCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5hZ3JlZVRvVGVybXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcblxuICAgICAgICBpZiAoJGNlcnRCYWxhbmNlRm9ybS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGJhbGFuY2VWYWwgPSB0aGlzLmNoZWNrQ2VydEJhbGFuY2VWYWxpZGF0b3IoJGNlcnRCYWxhbmNlRm9ybSk7XG5cbiAgICAgICAgICAgICRjZXJ0QmFsYW5jZUZvcm0ub24oJ3N1Ym1pdCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBiYWxhbmNlVmFsLnBlcmZvcm1DaGVjaygpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFiYWxhbmNlVmFsLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkcHVyY2hhc2VGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBwdXJjaGFzZVZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgaWYgKCFwdXJjaGFzZVZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY3JlYXRlRnJhbWUgPSAoY29udGFpbmVyLCBodG1sKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmcmFtZSA9ICQoJzxpZnJhbWUgLz4nKS53aWR0aCgnMTAwJScpLmF0dHIoJ2ZyYW1lQm9yZGVyJywgJzAnKS5hcHBlbmRUbyhjb250YWluZXIpWzBdO1xuXG4gICAgICAgICAgICAvLyBHcmFiIHRoZSBmcmFtZSdzIGRvY3VtZW50IG9iamVjdFxuICAgICAgICAgICAgY29uc3QgZnJhbWVEb2MgPSBmcmFtZS5jb250ZW50V2luZG93ID8gZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudCA6IGZyYW1lLmNvbnRlbnREb2N1bWVudDtcblxuICAgICAgICAgICAgZnJhbWVEb2Mub3BlbigpO1xuICAgICAgICAgICAgZnJhbWVEb2Mud3JpdGUoaHRtbCk7XG4gICAgICAgICAgICBmcmFtZURvYy5jbG9zZSgpO1xuXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgbWF4IGhlaWdodCBmb3IgdGhlIGlmcmFtZVxuICAgICAgICAgICAgY29uc3QgbWF4aGVpZ2h0ID0gTWF0aC5tYXgoKCQod2luZG93KS5oZWlnaHQoKSAtIDMwMCksIDMwMCk7XG5cbiAgICAgICAgICAgIC8vIEF1dG8gYWRqdXN0IHRoZSBpZnJhbWUncyBoZWlnaHQgb25jZSBpdHMgZG9jdW1lbnQgaXMgcmVhZHlcbiAgICAgICAgICAgICQoZnJhbWVEb2MpLnJlYWR5KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBNYXRoLm1pbihmcmFtZURvYy5ib2R5LnNjcm9sbEhlaWdodCArIDIwLCBtYXhoZWlnaHQpO1xuICAgICAgICAgICAgICAgICQoZnJhbWUpLmhlaWdodChoZWlnaHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJCgnI2dpZnQtY2VydGlmaWNhdGUtcHJldmlldycpLmNsaWNrKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHB1cmNoYXNlVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuXG4gICAgICAgICAgICBpZiAoIXB1cmNoYXNlVmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpZXdVcmwgPSBgJHskKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3ByZXZpZXdVcmwnKX0mJHskcHVyY2hhc2VGb3JtLnNlcmlhbGl6ZSgpfWA7XG5cbiAgICAgICAgICAgIG1vZGFsLm9wZW4oKTtcblxuICAgICAgICAgICAgYXBpLmdldFBhZ2UocHJldmlld1VybCwge30sIChlcnIsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb2RhbC51cGRhdGVDb250ZW50KHRoaXMuY29udGV4dC5wcmV2aWV3RXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQoKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9ICQoJyNtb2RhbC1jb250ZW50Jyk7XG4gICAgICAgICAgICAgICAgY3JlYXRlRnJhbWUoY29udGFpbmVyLCBjb250ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGVja0NlcnRCYWxhbmNlVmFsaWRhdG9yKCRiYWxhbmNlRm9ybSkge1xuICAgICAgICBjb25zdCBiYWxhbmNlVmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogJGJhbGFuY2VGb3JtLmZpbmQoJ2lucHV0W3R5cGU9XCJzdWJtaXRcIl0nKSxcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYmFsYW5jZVZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgc2VsZWN0b3I6ICRiYWxhbmNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiZ2lmdGNlcnRpZmljYXRlY29kZVwiXScpLFxuICAgICAgICAgICAgdmFsaWRhdGUoY2IsIHZhbCkge1xuICAgICAgICAgICAgICAgIGNiKGNoZWNrSXNHaWZ0Q2VydFZhbGlkKHZhbCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeS5pbnZhbGlkX2dpZnRfY2VydGlmaWNhdGUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBiYWxhbmNlVmFsaWRhdG9yO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJjZXJ0IiwibGVuZ3RoIiwiVFJBTlNMQVRJT05TIiwiaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSIsImRpY3Rpb25hcnkiLCJPYmplY3QiLCJrZXlzIiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsImkiLCJhcmd1bWVudHMiLCJKU09OIiwicGFyc2UiLCJ1bmRlZmluZWQiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJjb250ZXh0IiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJtYXAiLCJrZXkiLCJzcGxpdCIsInBvcCIsInJlZHVjZSIsImFjYyIsIlBhZ2VNYW5hZ2VyIiwibm9kIiwiY2hlY2tJc0dpZnRDZXJ0VmFsaWQiLCJmb3JtTW9kZWwiLCJhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIiwiYXBpIiwiZGVmYXVsdE1vZGFsIiwiR2lmdENlcnRpZmljYXRlIiwiX1BhZ2VNYW5hZ2VyIiwiX3RoaXMiLCJjYWxsIiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCIkY2VydEJhbGFuY2VGb3JtIiwiJCIsInB1cmNoYXNlTW9kZWwiLCJyZWNpcGllbnROYW1lIiwidmFsIiwicmVjaXBpZW50RW1haWwiLCJlbWFpbCIsImFwcGx5Iiwic2VuZGVyTmFtZSIsInNlbmRlckVtYWlsIiwiY3VzdG9tQW1vdW50IiwidmFsdWUiLCJtaW4iLCJtYXgiLCJzZXRBbW91bnQiLCJvcHRpb25zIiwiZm91bmQiLCJmb3JFYWNoIiwib3B0aW9uIiwiJHB1cmNoYXNlRm9ybSIsIiRjdXN0b21BbW91bnRzIiwiZmluZCIsInB1cmNoYXNlVmFsaWRhdG9yIiwic3VibWl0IiwiZGVsYXkiLCJ0YXAiLCIkZWxlbWVudCIsImRhdGEiLCJtaW5Gb3JtYXR0ZWQiLCJtYXhGb3JtYXR0ZWQiLCJpbnNlcnRGb3JtYXR0ZWRBbW91bnRzSW50b0Vycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJfbGVuIiwiYW1vdW50UmFuZ2UiLCJBcnJheSIsIl9rZXkiLCJhbW91bnRQbGFjZWhvbGRlcnMiLCJ1cGRhdGVkRXJyb3JUZXh0IiwicGxhY2Vob2xkZXIiLCJpbmNsdWRlcyIsInJlcGxhY2UiLCJhZGQiLCJzZWxlY3RvciIsInZhbGlkYXRlIiwiY2IiLCJudW1iZXJWYWwiLCJOdW1iZXIiLCJlcnJvck1lc3NhZ2UiLCJjZXJ0aWZpY2F0ZV9hbW91bnRfcmFuZ2UiLCJyZXN1bHQiLCJ0b05hbWUiLCJ0b0VtYWlsIiwiZnJvbU5hbWUiLCJmcm9tRW1haWwiLCJ0cmlnZ2VyZWRCeSIsImNlcnRUaGVtZSIsImdldCIsImNoZWNrZWQiLCJhZ3JlZVRvVGVybXMiLCJiYWxhbmNlVmFsIiwiY2hlY2tDZXJ0QmFsYW5jZVZhbGlkYXRvciIsIm9uIiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImNyZWF0ZUZyYW1lIiwiY29udGFpbmVyIiwiaHRtbCIsImZyYW1lIiwid2lkdGgiLCJhdHRyIiwiYXBwZW5kVG8iLCJmcmFtZURvYyIsImNvbnRlbnRXaW5kb3ciLCJkb2N1bWVudCIsImNvbnRlbnREb2N1bWVudCIsIm9wZW4iLCJ3cml0ZSIsImNsb3NlIiwibWF4aGVpZ2h0IiwiTWF0aCIsIndpbmRvdyIsImhlaWdodCIsInJlYWR5IiwiYm9keSIsInNjcm9sbEhlaWdodCIsImNsaWNrIiwibW9kYWwiLCJwcmV2aWV3VXJsIiwiY3VycmVudFRhcmdldCIsInNlcmlhbGl6ZSIsImdldFBhZ2UiLCJlcnIiLCJjb250ZW50IiwidXBkYXRlQ29udGVudCIsInByZXZpZXdFcnJvciIsIl9pbmhlcml0c0xvb3NlIiwiX3Byb3RvIiwicHJvdG90eXBlIiwiJGJhbGFuY2VGb3JtIiwiYmFsYW5jZVZhbGlkYXRvciIsImludmFsaWRfZ2lmdF9jZXJ0aWZpY2F0ZSIsImRlZmF1bHQiXSwic291cmNlUm9vdCI6IiJ9