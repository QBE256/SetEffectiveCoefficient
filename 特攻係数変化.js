/*--------------------------------------------------------------------------
　特効係数変化 ver 1.0

■作成者
キュウブ

■概要
武器のカスパラに{changeEffectiveFactor:<係数>}と入れると特効係数が上書きされる
係数が100未満の場合は武器の情報欄で"特効"ではなく"低減"と記載されるようになる

特定の敵に対して弱体化する武器、の他に
貧弱だけど通常よりも特効係数が高い武器
などの設定が可

■更新履歴
ver1.0 2017/07/22
初版

■対応バージョン
SRPG Studio Version:1.137

■規約
・利用はSRPG Studioを使ったゲームに限ります。
・商用・非商用問いません。フリーです。
・加工等、問題ありません。
・クレジット明記無し　OK (明記する場合は"キュウブ"でお願いします)
・再配布、転載　OK (バグなどがあったら修正できる方はご自身で修正版を配布してもらっても構いません)
・wiki掲載　OK
・SRPG Studio利用規約は遵守してください。

--------------------------------------------------------------------------*/


(function() {

	DamageCalculator.calculateAttackPower = function(active, passive, weapon, isCritical, totalStatus, trueHitValue) {
		var pow = AbilityCalculator.getPower(active, weapon) + CompatibleCalculator.getPower(active, passive, weapon) + SupportCalculator.getPower(totalStatus);

		if (this.isEffective(active, passive, weapon, isCritical, trueHitValue)) {
			if (typeof weapon.custom.changeEffectiveFactor === 'number') {
				pow = Math.floor(pow * weapon.custom.changeEffectiveFactor / 100);
			} 
			else {
				pow = Math.floor(pow * this.getEffectiveFactor());
			}
		}

		return pow;
	};

	ItemSentence.Effective.drawItemSentence = function(x, y, item) {
		this._aggregationViewer.drawAggregationViewer(x, y, this._getName(item));
	};

	ItemSentence.Effective._getName = function(item) {
		if (typeof item.custom.changeEffectiveFactor === 'number' && item.custom.changeEffectiveFactor < 100) {
			return "低減";// ここでは係数100未満の場合の表記を変える
		}
		else {
			return root.queryCommand('effective_capacity');
		}
	};

})();