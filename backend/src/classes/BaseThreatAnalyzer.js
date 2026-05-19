export class BaseThreatAnalyzer {
  constructor(name) {
    if (new.target === BaseThreatAnalyzer) {
      throw new Error("BaseThreatAnalyzer is abstract and cannot be instantiated directly.");
    }

    this.name = name;
  }

  analyze() {
    throw new Error("Subclasses must implement analyze().");
  }
}
