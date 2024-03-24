class LanguageModel {
    constructor(n) {
        this.n = n;
        this.ngrams = {};
    }

    train(text) {
        const words = text.toLowerCase().split(/\s+/); // Convert text to lowercase and split into words
        for (let i = 0; i < words.length - this.n; i++) {
            const ngram = words.slice(i, i + this.n - 1).join(' ');
            const nextWord = words[i + this.n - 1];
            if (!this.ngrams[ngram]) {
                this.ngrams[ngram] = {};
            }
            this.ngrams[ngram][nextWord] = (this.ngrams[ngram][nextWord] || 0) + 1;
        }
    }

    predictNextWord(prefix) {
        const prefixWords = prefix.toLowerCase().split(/\s+/).slice(-this.n + 1); // Convert prefix to lowercase and split into words
        const ngram = prefixWords.join(' ');
        if (this.ngrams[ngram]) {
            const nextWordCounts = this.ngrams[ngram];
            const totalSum = Object.values(nextWordCounts).reduce((acc, curr) => acc + curr, 0);
            const probabilities = {};
            for (const [word, count] of Object.entries(nextWordCounts)) {
                probabilities[word] = count / totalSum;
            }
            return probabilities;
        } else {
            return {};
        }
    }
}

export default LanguageModel;
