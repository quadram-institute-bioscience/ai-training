
library(phyloseq)
library(microbiome)
library(vegan)
library(compositions)
library(ggplot2)
library(tibble)
library(dplyr)

# 📥 2. Load Your Data
  

# Read the raw counts
counts_table <- read.csv("counts.csv", row.names = 1)

# Read taxonomy
taxon_table <- read.csv("taxonomy.csv", row.names = 1)

# Read experimental mapping file
mapping <- read.csv("mapping.csv", row.names = 1)

# Set grouping variable
variable <- "Diet"

# --- Verification ---
# Print dimensions for verification
print(paste("Counts table dimensions:", paste(dim(counts_table), collapse = " x ")))
print(paste("Taxonomy table dimensions:", paste(dim(taxon_table), collapse = " x ")))
print(paste("Mapping file dimensions:", paste(dim(mapping), collapse = " x ")))

# Check for compatibility
all_taxa_in_counts_and_tax <- all(rownames(counts_table) %in% rownames(taxon_table))
all_taxa_in_tax_and_counts <- all(rownames(taxon_table) %in% rownames(counts_table))
all_samples_in_counts_and_mapping <- all(colnames(counts_table) %in% rownames(mapping))
all_samples_in_mapping_and_counts <- all(rownames(mapping) %in% colnames(counts_table))

print(paste("All taxa in counts are in taxonomy:", all_taxa_in_counts_and_tax))
print(paste("All taxa in taxonomy are in counts:", all_taxa_in_tax_and_counts))
print(paste("All samples in counts are in mapping:", all_samples_in_counts_and_mapping))
print(paste("All samples in mapping are in counts:", all_samples_in_mapping_and_counts))

if (!all_taxa_in_counts_and_tax || !all_taxa_in_tax_and_counts) {
  warning("Taxa names do not match between counts and taxonomy tables.")
}
if (!all_samples_in_counts_and_mapping || !all_samples_in_mapping_and_counts) {
  warning("Sample names do not match between counts and mapping tables.")
}

  ## 🧬 3. Create a Phyloseq Object
  

otu <- otu_table(as.matrix(counts_table), taxa_are_rows = TRUE)
tax <- tax_table(as.matrix(taxon_table))
sampledata <- sample_data(mapping)

physeq <- phyloseq(otu, tax, sampledata)


  ## ⚖️ 4. Classical Approach: Relative Abundance + Bray-Curtis
  

# Total Sum Scaling (TSS) normalization
physeq_tss <- transform_sample_counts(physeq, function(x) x / sum(x))

# Bray-Curtis distance
bray_dist <- vegdist(as.matrix(otu_table(physeq_tss)), method = "bray")

# PCoA
ordination_bray <- cmdscale(bray_dist, k = 2, eig = TRUE)
ordination_df <- as.data.frame(ordination_bray$points)
ordination_df$Sample <- rownames(ordination_df)
ordination_df <- merge(ordination_df, mapping, by.x = "Sample", by.y = "row.names")

# Plot
ggplot(ordination_df, aes(V1, V2, color = get(variable))) +
  geom_point(size = 4) +
  labs(title = "PCoA using Bray-Curtis", x = "PC1", y = "PC2") +
  theme_minimal()


  ## 🔁 5. CoDA Approach: CLR + Aitchison Distance
  

# Replace zeros with pseudocount
physeq_nozeros <- microbiome::transform(physeq, "clr")

# CLR-transformed OTU table
otu_clr <- otu_table(physeq_nozeros)

# Aitchison distance (Euclidean on CLR)
aitch_dist <- dist(t(otu_clr), method = "euclidean")

# PCoA
ordination_aitch <- cmdscale(aitch_dist, k = 2, eig = TRUE)
ordination_df2 <- as.data.frame(ordination_aitch$points)
ordination_df2$Sample <- rownames(ordination_df2)
ordination_df2 <- merge(ordination_df2, mapping, by.x = "Sample", by.y = "row.names")

# Plot
ggplot(ordination_df2, aes(V1, V2, color = get(variable))) +
  geom_point(size = 4) +
  labs(title = "PCoA using Aitchison Distance (CLR)", x = "PC1", y = "PC2") +
  theme_minimal()

  
  ## 🧪 6. PERMANOVA (adonis2)
  

# Classical
adonis_bray <- adonis2(bray_dist ~ get(variable), data = mapping)
print(adonis_bray)

# Compositional
adonis_aitch <- adonis2(aitch_dist ~ get(variable), data = mapping)
print(adonis_aitch)
```

---
  
  ## ⚠️ 7. Check Beta-Dispersion (for Valid PERMANOVA)
  
# Classical
disp_bray <- betadisper(bray_dist, mapping[[variable]])
anova(disp_bray)

# Compositional
disp_aitch <- betadisper(aitch_dist, mapping[[variable]])
anova(disp_aitch)

  
  ## 📌 Summary
  
# * **Classical approach**: Uses Bray-Curtis on relative abundances. Fast and intuitive.
# * **Compositional approach (CoDA)**: Uses CLR + Aitchison distance. Statistically sound for relative data.
# * **PERMANOVA** reveals if group differences are significant.
# * **Beta-dispersion** checks if those differences are due to real composition changes (not variability).
#
# ✅ Switching to CoDA is straightforward and gives you a more robust understanding of your data.

 ## 🔗 Further Reading
  
# * Gloor GB et al. *Microbiome datasets are compositional*. Microbiome, 2017.
# * Quinn TP et al. *A field guide for the compositional analysis of any-omics data*. GigaScience, 2019.
# * [Microbiome R Package Documentation](https://microbiome.github.io)


